const express = require('express');
const rateLimit = require('express-rate-limit');
const stickers = require('../data/stickers');

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: 'Too many requests, try again later.'
});

router.use(limiter);

//GET all stickers
router.get('/', (req, res) => {
    res.json(stickers);
});

//Get by ID
router.get('/:id', (req,res)=>{
    const sticker = stickers.find(s => String(s.id)===req.params.id);

    if(!sticker) return res.status(404).json({error: 'Sticker not found'});
    res.json(sticker);
});

module.exports = router;
