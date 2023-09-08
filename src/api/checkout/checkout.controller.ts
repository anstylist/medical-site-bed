import { Request, Response } from 'express';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})

export const checkoutHandler = async (req: Request, res: Response) => {
  const { paymentMethod, amount } = req.body;
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

    res.send({
      message: 'Hello from checkout',
      payment
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message
    })
  }
};