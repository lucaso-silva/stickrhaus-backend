const express = require('express');
const cors = require('cors');
const stickersRouter = require('./routes/stickers');
const PORT = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('Connected to MongoDB Atlas'))
    .catch((err)=>console.error("MongoDB connection error:", err));

app.use('/api/stickers', stickersRouter);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/api/stickers`);
})