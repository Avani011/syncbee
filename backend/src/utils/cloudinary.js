import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            console.log('No file path provided');
            return null
        }

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        fs.unlinkSync(localFilePath) //remove locally saved temporary file

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove locally saved temporary file 
        return null
    }
}

export {uploadOnCloudinary}