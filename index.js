const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('second hand mobile portal server is running');
})

app.listen(port, () => console.log(`Second hand mobile portal running on ${port}`))