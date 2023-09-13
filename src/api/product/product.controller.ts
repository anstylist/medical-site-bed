import { Request, Response } from 'express'

import {
  getAllProducts,
  createProduct,
  updateProduct
} from './product.service'

export const getAllProductsHandler = async (req: Request, res: Response) => {

  try {
    const products = await getAllProducts()
    return res.status(200).json(products)

  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function createProductHandler(req: Request, res: Response) {
  const data = req.body
  try {
    console.log(req.file, req.body)
    const product = await createProduct(req.body, req.file)

    return res.status(201).json({ message: 'Product created successfully', product })

  } catch (error: any) {
    console.log(error)
    res.status(400).json({
      message: error?.message,
    })
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  const data = req.body
  try {

    const product = await updateProduct(data)
    return res.status(200).json({ message: 'Product updated successfully', product })

  } catch (error: any) {
    console.log(error)
    res.status(400).json({
      message: error?.message,
    })
  }
}

