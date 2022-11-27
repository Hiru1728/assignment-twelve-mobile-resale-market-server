const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yrpb3ds.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const mobileCompanyCollection = client.db('secondHandMobile').collection('mobiles');
        const mobilesCollection = client.db('secondHandMobile').collection('mobiles');

        app.get('/category', async (req, res) => {
            const query = {};
            const mobiles = await mobileCompanyCollection.find(query).toArray();
            res.send(mobiles);
        })

    }
    finally {

    }
}

app.get('/', async (req, res) => {
    res.send('second hand mobile portal server is running');
})

app.listen(port, () => console.log(`Second hand mobile portal running on ${port}`))