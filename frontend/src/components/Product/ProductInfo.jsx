import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../context/CartContext";
import Carousel from "../../utils/Carousel";

function ProductInfo({ _id, name, description, images, price, category }) {
  const { addToCart } = useCart();
  


  return (
    <>
      <div className={`flex flex-col gap-3`}>
        {images?.length && (
          <Carousel images={images} />
        )}
        <h1 className=" font-bold text-2xl text-center">{name}</h1>
        <Link to={`/category/${category?._id}`} className="hover:underline">
          <p className="text-center">{category?.name}</p>
        </Link>
        <div className="flex justify-center">
          <div className="flex w-[600px] justify-between">
            <div className="text-center flex gap-2">
              <h1 className="font-bold">Price: </h1>
              <span className="text-green-400">{price}</span>
            </div>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 hover:text-gray-950 w-[100px] h-[30px] rounded-xl text-gray-800 "
              onClick={() => {
                addToCart({
                  _id,
                  name,
                  images,
                  price,
                });
              }}
            >
              Add to Cart
            </button>
            <button className="hover:bg-[#4CAF50] bg-green-600 rounded-xl w-[100px] hover:text-gray-950 text-gray-800">
              Buy Now
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="w-[800px]" >{description}</p>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
