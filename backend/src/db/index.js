import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';


const connectToDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        if (connection){
            console.log("Mongodb connected successfully");
        }
        return connection
    
    } catch (error) {
        throw error
    }
}


export { connectToDB }