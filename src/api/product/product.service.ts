import { PrismaClient } from '@prisma/client'
import uploadFile from '../../utils/uploadFile';
import { Product } from './product.types'

const prisma = new PrismaClient()

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id
    }
  })
}

export const getAllProducts = async (search?: string) => {
  if (!search) {
    return await prisma.product.findMany()
  }

  return await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          category: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          code: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
      {
        createdAt: 'desc'
      }
    ]
  })
}

function formatData(data: any) {
  return {
    ...data,
    image: data?.image || undefined,
    price: Number.parseFloat(data?.price) || undefined,
    stock: Number.parseInt(data?.stock) || undefined,
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

export const updateProduct = async (id: string, data: Product, file?: Express.Multer.File) => {
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
        id
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
