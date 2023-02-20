require('dotenv').config()


export const S3_CONFIG = {
    auth: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    Bucket: process.env.BUCKET_NAME
}