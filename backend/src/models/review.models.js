import { Schema, model } from 'mongoose'


const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    stars:{
        type: Number,
        required: true
    },
    comment:{
        type: String
    }
})


export const Review = model("Review", reviewSchema)
