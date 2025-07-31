const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DOMAIN = 'http://localhost:5000';
const { verifyToken } = require('../middleware/auth');

//POST
router.post('/create-checkout-session', verifyToken, async (req,res)=>{
    const cart = req.body.cart;
    const cart_items = [];
    cart.map((item)=>{
        let newPrice = parseInt((item.price - item.price*item.discountPerCent)*100);
        const newItem = { price_data: { currency:'cad', product_data:{name: item.description}, unit_amount: newPrice,}, quantity: item.qty}
        cart_items.push(newItem);
    })
    cart_items.push({price_data: {currency:'cad', product_data:{name: 'Delivery fee'}, unit_amount: 599}, quantity: 1});

    const session = await stripe.checkout.sessions.create({
        line_items: cart_items,
        // billing_address_collection: 'required',
        // shipping_address_collection: {
        //   allowed_countries: ['CA'],
        // },
        // automatic_tax: {
        //     enabled: true,
        // },
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: `${DOMAIN}/success-order?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({clientSecret: session.client_secret});
});

//GET
router.get('/session_status', async (req,res)=>{
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email
    });
});


module.exports = router;