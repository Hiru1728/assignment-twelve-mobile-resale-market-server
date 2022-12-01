const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yrpb3ds.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const mobileCompanyCollection = client.db('secondHandMobile').collection('categoryMobile');
        const mobilesCollection = client.db('secondHandMobile').collection('subcategoryMobiles');
        const bookingCollection = client.db('secondHandMobile').collection('bookings');
        const userCollection = client.db('secondHandMobile').collection('users');
        const productCollection = client.db('secondHandMobile').collection('products');

        app.get('/category', async (req, res) => {
            const query = {};
            const mobiles = await mobileCompanyCollection.find(query).toArray();
            res.send(mobiles);
        });

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            const mobile = await mobilesCollection.find(query).toArray();
            res.send(mobile);
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = {
                email: email
            }
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })




    }
    finally {

    }
}
run().catch(error => console.log(error))

app.get('/', async (req, res) => {
    res.send('second hand mobile portal server is running');
})

app.listen(port, () => console.log(`Second hand mobile portal running on ${port}`))