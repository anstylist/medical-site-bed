import {v2 as cloudinary} from 'cloudinary'
import path from 'node:path'
import fs from 'node:fs'

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string
const CLOUDINARY_API_KEY_SECRET = process.env.CLOUDINARY_API_KEY_SECRET as string
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string

const appRoot = path.resolve(`${__dirname}/../..`);

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_KEY_SECRET,
  secure: true
})

export default function (directory: string, file: string) {
    const options = {
      use_filename: false,
      unique_filename: true,
      overwrite: false,
      folder: directory,
    }

    const filePath = `${appRoot}/${file}`

    console.log('--- AC: ', {
      appRoot,
      filePath,
    });
    
    return cloudinary.uploader
      .upload(filePath, options)
      .then(response => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(`An error has occurred when trying to delete the file ${filePath}`)
          }
          console.log(`File ${filePath} deleted successfully`)
        })

        return response;
      })
}


