import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as OrderService from '../order/order.service'
import { OptionRequest } from "../../auth/auth.types";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})

export const checkoutHandler = async (req: OptionRequest, res: Response) => {
  const { paymentMethod, checkout, amount, products } = req.body;
  try {
    const { id } = paymentMethod
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'test',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      }
    })

    let orderStatus = 'pending-for-payment'
    if (payment?.status === "succeeded") {
      orderStatus = 'success'
    }

    const order = await OrderService.createOrder(req.user, {
      ...checkout,
      userId: req.user?.id,
      status: orderStatus,
      paymentId: payment?.id,
      paymentMethod: payment?.payment_method_types[0]
    }, products)

    res.send({
      message: 'The order was created successfully',
      payment,
      order,
    });
  } catch (error: any) {
    console.log(error)
    res.status(500).send({
      message: error.message
    })
  }
};