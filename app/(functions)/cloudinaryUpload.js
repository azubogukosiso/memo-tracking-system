import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const cloudinaryUpload = (bufferImage) => {
    console.log("this is the bufferImage: ", bufferImage);
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    return new Promise((resolve, reject) => {

        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                overwrite: true,
                invalidate: true,
                resource_type: "auto",
            },
            (error, result) => {
                if (result) {
                    console.log("this is the result: ", result);
                    resolve(result.secure_url);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(bufferImage).pipe(cld_upload_stream);
    });

};