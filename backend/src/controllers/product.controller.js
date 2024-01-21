import { Product } from "../models/product.models.js";
import { Category } from "../models/category.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({
    data: products,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(401, "No product id was given");
  }

  const product = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $addFields: {
        category: {
          $first: "$category",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        images: 1,
        price: 1,
        category: 1,
      },
    },
  ]);

  if (!product.length) {
    throw new ApiError(
      500,
      "Something went wrong searching the current product"
    );
  }

  return res.json({
    data: product[0],
    status: 200,
    message: "The required product is gotten successfully",
  });
});

const getProductsByCategory = asyncHandler(async(req, res)=>{
    const { categoryId } = req.params

    if (!categoryId){
        throw new ApiError(400, "The category is not given")
    }

    const products = await Product.find({
        categoryId
    })

    if (!products){
        throw new ApiError(501, "Couldn't find any products of that category")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "The products are fetched successfully")
        )
})



const uploadProduct = asyncHandler(async (req, res) => {
  const { name, description, price, categoryName } = req.body;
  console.log(req.body)
  console.log(name)
  console.log(description)
  console.log(price)

  const reqFields = ["name", "price", "categoryName"];

  reqFields.forEach((field) => {
    if (!req.body[field]) {
      throw new ApiError(
        401,
        ((field[0].toUpperCase() + field.slice(1)) + " field is a required field")
      );
    }
  });

  const category = await Category.findOne({ name: categoryName });

  if (!category) {
    throw new ApiError(400, "The given category of the product is not found");
  }

  const imageFiles = req?.files;

  if (!imageFiles) {
    throw new ApiError(400, "The image for the product is not provided");
  }

  let images = [];

  for (const image of imageFiles) {
    const img = await uploadToCloudinary(image.path);
    images.push(img);
  }

  if (!images || !images.length || images.length !== imageFiles.length) {
    throw new ApiError(500, "Something went wrong uploading the image");
  }

  const product = await Product.create({
    name,
    description: description || "",
    price,
    categoryId: category._id,
    images,
  });

  if (!product) {
    throw new ApiError(500, "Error while uploading the product");
  }

  return res.json(
    new ApiResponse(200, product, "The product uploaded successfully")
  );
});

const getReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(404, "No such product exists");
  }

  const reviewDetails = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "productId",
        as: "reviewers",
        pipeline: [
          {
            $lookup: {
              from: "customers",
              localField: "customerId",
              foreignField: "_id",
              as: "reviewer",
              pipeline: [
                {
                    $project: {
                        username:1,
                        avatar: 1
                    }
                }
              ]
            },
          },
          {
            $addFields:{
                reviewer:{
                    $first: "$reviewer"
                }
            }
          }
        ],
      },
    },
    {
      $addFields: {
        reviewCount: {
          $size: "$reviewers",
        },
      },
    },
    {
      $project:{
        reviewers:1,
        reviewCount:1,
      }
    }
  ]);

  if (!reviewDetails.length) {
    throw new ApiError(500, "Something went wrong getting the review details");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        reviewDetails[0],
        "The review details were gotten succesfully"
      )
    );
});

const getReviewsByStars = asyncHandler(async (req, res)=>{
    const { productId } = req.params
    const { stars } = req.body

    const reviewData = await Product.aggregrate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup:{
                from:"reviews",
                localField:"_id",
                foreignField:"productId",
                as:"reviewers",
                pipeline:[
                    {
                        $lookup:{
                            from:"customers",
                            localField:"_id",
                            foreignField: "customerId",
                            as:"reviewer",
                            pipeline:[
                                {
                                    $project:{
                                        username:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            reviewer:{
                                $first:"$reviewer"
                            }
                        }
                    },
                    {
                        $cond:{
                            if: {stars},
                            then: {
                                $project:{
                                    productId:0,
                                    userId:0,
                                    stars:0,
                                    comment:0
                                }

                            },
                            else: {
                                $project:{
                                   productId:1,
                                   userId:1,
                                   stars:1,
                                   comment:1
                                }
                            }

                        }
                    }

                ]
            }

        }
    ])

    if (!reviewData.length){
        throw new ApiError(401, "Not valid product id")
    }
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, reviewData[0].reviewers, "The reviews fetched successfully!")
        )

})

export { getAllProducts, getProduct, uploadProduct, getReviews, getReviewsByStars };
