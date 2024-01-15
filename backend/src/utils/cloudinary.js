import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async (file) => {
    try {
      if (!file) return null
      const response = await cloudinary.uploader.upload(file, {
        resource_type:'auto'
      })
      if (response){
        console.log("File uploaded successfully on ", response.url)
      }
      fs.unlinkSync(file)

      return {
        url:response.url,
        public_id:response.public_id
      }
    
    } catch (error) {
        fs.unlinkSync(file)
        throw Error(error.message)
    }
}

const deleteFromCloudinary = async(req, res) => {
  try {
    await cloudinary.uploader.destroy('docs/vegetables')
  } catch (error) {
    throw Error(error.message)
  }
}

export { uploadToCloudinary, deleteFromCloudinary}