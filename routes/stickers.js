const express = require('express');
const rateLimit = require('express-rate-limit');
const Sticker = require('../models/Sticker');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: 'Too many requests, try again later.'
});

router.use(limiter);

//GET all stickers
router.get('/', async (req, res) => {
    try{
        const stickers = await Sticker.find();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        let filteredStickers = stickers;
        const start = (page-1) * limit;
        const paginated = filteredStickers.slice(start, start+limit);

        res.json({
            total: filteredStickers.length,
            page,
            limit,
            dataPag: paginated,
            data: stickers
        });
    }catch(err){
        res.status(500).json({error:'Failed to fetch stickers.'});
    }
});

//Get by ID
router.get('/:id', async (req,res)=>{
    try{
        const sticker = await Sticker.findById(req.params.id);
        sticker ? res.json({...sticker._doc, id:sticker._id}) : res.status(404).json({error:'Sticker not found'});

    }catch(err){
        res.status(400).json({error:'Invalid sticker ID'})
    }
});

//POST a new sticker
router.post('/',  async (req, res)=>{
    try{
        const newSticker = new Sticker(req.body);
        const saved = await newSticker.save();
        res.status(201).json({...saved._doc, id:saved._id});
    }catch(err){
        res.status(400).json({error:'Invalid input'});
    }
});

//DELETE a sticker
router.delete('/:id', async (req,res)=>{
    try{
        const deleted = await Sticker.findByIdAndDelete(req.params.id);
        deleted ? res.json({ message: 'Sticker deleted'}) : res.status(404).json({error: 'Not found'});
    }catch(err){
        res.status(400).json({error:'Invalid ID'});
    }
});

//UPDATE a sticker
router.patch('/:id', async (req,res)=>{
    try{
        const updatedSticker = await Sticker.findByIdAndUpdate(
            req.params.id,
            {
                description: req.body.description,
                size: req.body.size,
                category: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                discountPerCent: req.body.discountPerCent
            },
            { new: true }
        );
        res.json(updatedSticker);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
