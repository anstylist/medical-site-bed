import { PrismaClient } from "@prisma/client";
import { Order } from "./order.types";
import { Product } from "../product/product.types";

const prisma = new PrismaClient();

export async function getAllOrder() {
  return await prisma.order.findMany({
    include: {
      products: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              name: true,
              description: true,
              code: true,
              image: true,
              category: true
            }
          }
        }
      },
      user: {
        select: {
          fullName: true,
          email: true
        }
      }
    }
  })
}

export async function createOrder(user: any, orderData: Order, productsList: any[]) {
  const orderCreate = await prisma.order.create({
    data: {
      ...orderData,
      products: {
        create: productsList
      }
    },
    include: {
      products: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              name: true,
              description: true,
              code: true,
              image: true,
              category: true
            }
          }
        }
      }
    }
  });

  const stockUpdatePromises = productsList.map(async (item) => {
    const product = await prisma.product.findUnique({
      select: {
        id: true,
        stock: true
      },
      where: {
        id: item.productId
      }
    });

    if (product) {
      const updatedStock = product.stock - item.quantity;
      await prisma.product.update({
        where: {
          id: product.id
        },
        data: {
          stock: updatedStock
        }
      });
    }
  });

  await Promise.all(stockUpdatePromises);

  return orderCreate;
}




