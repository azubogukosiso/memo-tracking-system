import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (image, folderName) => {
    let fileBuffer = await image.arrayBuffer();
    let mime = image.type;
    let encoding = 'base64';
    let base64Data = Buffer.from(fileBuffer).toString('base64');
    let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(fileUri,
            {
                overwrite: true,
                invalidate: true,
                resource_type: "auto",
                folder: folderName
            },
            (error, result) => {
                if (result) {
                    console.log("this is the result: ", result);
                    resolve(result.secure_url);
                } else {
                    console.log("this is the error: ", error);
                    reject(error);
                }
            }
        );
    });
};