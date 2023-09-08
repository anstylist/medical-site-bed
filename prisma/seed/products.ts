import { PrismaClient } from '@prisma/client'
import data from './data/products.json'

type ProductCreate = {
 name: string;
 description: string;
 code: string;
 image: string;
 category: string;
 price: number;
 stock: number;
}

export default function (prisma: PrismaClient) {
  return data.map(async (product: ProductCreate) => {
    return await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        code: product.code,
        image: product.image,
        category: product.category,
        price: product.price,
        stock: product.stock,
      },
    })
  })
}