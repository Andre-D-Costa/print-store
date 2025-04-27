import { z } from "zod";
import { Product, Order } from "../../models/index.js";
import { authenticate } from "../../middlewares/auth.js";
import Stripe from "stripe";

export const orderSchema = z
  .object({
    email: z.string().email(),
    products: z.array(
      z.object({
        _id: z.string(),
        quantity: z.number(),
      })
    ),
  })
  .strict();

const orderRoutes = [
  {
    method: "post",
    path: "/orders",
    handler: async (req, res) => {
      try {
        const userId = req.user._id;

        const response = orderSchema.safeParse(req.body);

        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }
        const productIds = response.data.products.map((product) => product._id);

        // get the products from DB
        const products = await Product.find({
          _id: { $in: productIds },
        });

        // check if the products.quantity === quantity in DB
        if (products.length !== productIds.length) {
          return res.status(400).json({ message: "Invalid product IDs" });
        }

        // build the order to save in DB
        const orderProducts = response.data.products.map((product) => {
          const backendProduct = products.find(
            (item) => item._id.toString() === product._id
          );

          return {
            productId: backendProduct._id,
            name: backendProduct.name,
            price: backendProduct.price,
            quantity: product.quantity, // quantity received from FrontEnd
            iva: 23, // set valor but it can be dynamic
          };
        });

        const order = await Order.create({
          user: userId,
          email: response.data.email,
          products: orderProducts,
          payment_status: "pending",
          stripePaymentId: null,
          totalAmount: orderProducts.reduce(
            (acc, curr) => curr.price * curr.quantity + acc,
            0
          ),
        });

        // build the payment with stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // build the order to save in stripe
        const lineItems = response.data.products.map((product) => {
          const backendProduct = products.find(
            (item) => item._id.toString() === product._id
          );
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: backendProduct.name,
              },
              unit_amount: parseInt(backendProduct.price * 100), // amount in cents
            },
            quantity: product.quantity,
          };
        });

        // save environment key
        const FRONTEND_URL = process.env.FRONTEND_URL;

        // the stripe session routes (copied from stripe API docs)
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: lineItems,
          success_url: `${FRONTEND_URL}/checkout/success?orderId=${order._id.toString()}`,
          cancel_url: `${FRONTEND_URL}/checkout/cancel?orderId=${order._id.toString()}`,
        });

        return res.status(201).json({ payment_url: session.url });
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];

export default orderRoutes;
