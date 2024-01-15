import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true })

export const Category = model("Category", categorySchema)