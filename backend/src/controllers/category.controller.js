const getAllCategories = asyncHandler(async (req, res)=>{
    const categories = await Category.find({})

    if (!categories){
        throw new ApiError(500, "Something went wrong fetching the categories")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, categories, "All the categories fetched successfully")
        )
})

export { getAllCategories }
