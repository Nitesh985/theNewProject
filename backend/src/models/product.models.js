import mongoose, {Schema, model} from 'mongoose'


const productSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description: {
        type: String
    },
    images: {
        type: [Object],
        required: true
    },
    price:{
        type:String,
        required: true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
}, { timestamps: true })


export const Product = model("Product", productSchema)

