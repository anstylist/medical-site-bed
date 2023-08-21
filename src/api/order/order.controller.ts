import { Request, Response } from "express";
import { OptionRequest } from "../../auth/auth.types";
import { createOrder, getAllOrder } from "./order.service";


export async function createOrderHandler(req: OptionRequest, res: Response) {

  const user = req.user
  const { orderData, productsList } = req.body

  try {
    if (!user?.id) {
      res.status(500).json({ mesaage: 'User not found' })
    }

    const order = await createOrder(user.id, orderData, productsList)
    res.status(200).json({ mesage: 'Order Created', order })

  } catch (error) {
    res.status(404).json({ error })
  }
}

export async function getAllOrderHandler(req: Request, res: Response) {

  try {
    const allOrder = await getAllOrder()
    res.status(200).json(allOrder)

  } catch (error) {
    res.status(500).json({ error })
  }

}
