const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sticker = require('./models/Sticker');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');

    return Sticker.insertMany([
        {
            "description": "Grogu",
            "size": "3x3 inch",
            "category": "movies",
            "price": 4.99,
            "stock": 15,
            "discountPerCent": 0
        },
        {
            "description": "Pink Tulip",
            "size": "2x2 inch",
            "category": "nature",
            "price": 3.49,
            "stock": 18,
            "discountPerCent": 10
        },
        {
            "description": "Retro Game Controller",
            "size": "2.5x2.5 inch",
            "category": "technology",
            "price": 4.25,
            "stock": 10,
            "discountPerCent": 0
        },
        {
            "description": "Sun",
            "size": "2x2 inch",
            "category": "nature",
            "price": 2.99,
            "stock": 20,
            "discountPerCent": 0
        },
        {
            "description": "Stitch",
            "size": "3x3 inch",
            "category": "movies",
            "price": 4.99,
            "stock": 12,
            "discountPerCent": 15
        },
        {
            "description": "Mountains",
            "size": "3x2 inch",
            "category": "nature",
            "price": 3.75,
            "stock": 9,
            "discountPerCent": 0
        },
        {
            "description": "Cyber Cat",
            "size": "2.5x2 inch",
            "category": "technology",
            "price": 4.50,
            "stock": 14,
            "discountPerCent": 10
        },
        {
            "description": "Rainbow Cloud",
            "size": "2x2 inch",
            "category": "abstract",
            "price": 3.25,
            "stock": 20,
            "discountPerCent": 10
        },
        {
            "description": "Space Rocket",
            "size": "3x1.5 inch",
            "category": "space",
            "price": 3.99,
            "stock": 17,
            "discountPerCent": 0
        },
        {
            "description": "Butterfly",
            "size": "2.5x2.5 inch",
            "category": "nature",
            "price": 3.50,
            "stock": 16,
            "discountPerCent": 0
        },
        {
            "description": "Astronaut Peace",
            "size": "3x2 inch",
            "category": "space",
            "price": 4.75,
            "stock": 11,
            "discountPerCent": 15
        },
        {
            "description": "Cherry Blossom",
            "size": "2x2 inch",
            "category": "nature",
            "price": 3.99,
            "stock": 20,
            "discountPerCent": 10
        },
        {
            "description": "Pixel Heart",
            "size": "2x2 inch",
            "category": "technology",
            "price": 2.99,
            "stock": 19,
            "discountPerCent": 0
        },
        {
            "description": "Dragon",
            "size": "3x3 inch",
            "category": "fantasy",
            "price": 5.25,
            "stock": 8,
            "discountPerCent": 0
        },
        {
            "description": "Star",
            "size": "1.5x1.5 inch",
            "category": "abstract",
            "price": 2.25,
            "stock": 20,
            "discountPerCent": 15
        }
    ]);
})
    .then(()=>{
        console.log("Seeded stickers data");
        mongoose.disconnect();
    })
    .catch((err)=>{
        console.error(err);
        mongoose.disconnect();
    })