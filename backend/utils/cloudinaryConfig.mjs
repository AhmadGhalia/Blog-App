import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'auto',
    });
    return data;
  } catch (error) {
    return error
  }
}

const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const resoult = await cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    return error
  }
}
export {cloudinaryUploadImage, cloudinaryRemoveImage}
