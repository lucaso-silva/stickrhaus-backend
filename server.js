const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const stickersRouter = require('./routes/stickers');
const authRouter = require('./routes/auth');
const checkoutRouter = require('./routes/checkout');
const cookieParser = require('cookie-parser');

dotenv.config();

const allowedOrigins = [
    'http://localhost:5000',
    'https://stickrhaus.vercel.app'
];

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log('Connected to MongoDB Atlas'))
    .catch((err)=>console.error("MongoDB connection error:", err));

app.use('/api/stickers', stickersRouter);
app.use('/api/auth', authRouter);
app.use('/api/checkout', checkoutRouter)

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/api/stickers`);
});