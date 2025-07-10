const express = require('express');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const stickersRouter = require('./routes/stickers');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log('Connected to MongoDB Atlas'))
    .catch((err)=>console.error("MongoDB connection error:", err));

app.use('/api/stickers', stickersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/api/stickers`);
});