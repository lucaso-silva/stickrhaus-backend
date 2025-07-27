const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DOMAIN = 'http://localhost:4000';
// const app = express();

//POST
router.post('/create-checkout-session', async (req,res)=>{
    const cart = req.body.cart;
    const cart_items = [];
    cart.map((item)=>{
        const newItem = { price_data: { currency:'cad', product_data:{name: item.description}, unit_amount: item.price*100,}, quantity: item.qty}
        cart_items.push(newItem);
    })
    cart_items.push({price_data: {currency:'cad', product_data:{name: 'Delivery fee'}, unit_amount: 599}, quantity: 1});

    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        // line_items: [{
        //         price_data: {
        //             currency: 'cad',
        //             product_data: {
        //                 name: 'T-shirt'
        //             },
        //             unit_amount: 2000,
        //         },
        //             quantity: 2,
        //         },
        //     ],
        line_items: cart_items,
        mode: 'payment',
        return_url: `${DOMAIN}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({clientSecret: session.client_secret});
});

//GET
router.get('/session-status', async (req,res)=>{
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email
    });
});

module.exports = router;