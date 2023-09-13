import { PrismaClient } from '@prisma/client'
import uploadFile from '../../utils/uploadFile';
import { Product } from './product.types'

const prisma = new PrismaClient()

export const getAllProducts = async () => {
  const products = await prisma.product.findMany()
  return products
}

function formatData(data: any) {
  return {
    ...data,
    price: Number.parseFloat(data?.price),
    stock: Number.parseInt(data?.stock),
  }
}

export const createProduct = async (data: Product, file?: Express.Multer.File) => {
  let fileResponse = null
  let filePath = file?.path || ''
  let product

  if (!filePath) {
    throw new Error('File is required')
  }

  try {
    fileResponse = await uploadFile('products', filePath)
  } catch (error) {
    throw error
  }

  try {
    product = await prisma.product.create({
      data: {
        ...formatData(data),
        image: fileResponse.secure_url
      }
    })
  } catch (error) {
    throw error
  }

  return product
}

export const updateProduct = async (data: Product, file?: Express.Multer.File) => {
  let fileResponse = null
  let filePath = file?.path || ''
  let product

  if (filePath) {
    try {
      fileResponse = await uploadFile('products', filePath)
    } catch (error) {
      throw error
    }

    data.image = fileResponse.secure_url
  }

  try {
    product = await prisma.product.update({
      where: {
        id: data.id
      },
      data: {
        ...formatData(data)
      }
    })
  } catch(error) {
    throw error
  }
  
  return product
}
