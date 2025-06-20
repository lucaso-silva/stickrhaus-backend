const express = require('express');
const cors = require('cors');
const stickersRouter = require('./routes/stickers');
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/stickers', stickersRouter);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}.`);
});