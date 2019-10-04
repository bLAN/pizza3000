const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get orders
router.get('/', async (req, res) => {
   const orders = await loadOrdersCollection();
   res.send(await orders.find({}).toArray());
});

// Add orders
router.post('/', async (req, res) => {
    const orders = await loadOrdersCollection();
    await orders.insertOne({
        name: req.body.name,
        pizza: req.body.pizza,
        statusID: 1,
        createdAt: new Date(),
    });
    res.status(201).send();
});

// Delete orders
router.delete('/:id', async (req, res) => {
    const orders = await loadOrdersCollection();
    await orders.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Update orders
router.put('/:id', async (req, res) => {
    const orders = await loadOrdersCollection();
    const updateObject = req.body;
    orders.update({_id: new mongodb.ObjectID(req.params.id)}, { $set:updateObject });
    res.status(200).send();
});

router.get('/items', async (req, res) => {
    const db = await loadDb();
    const orders = db.collection('orders');
    const items = db.collection('pizzaBase');

    const stats = await orders.aggregate([
        {
            $group: {
                _id: '$pizza',
                sold: {
                    $sum: 1
                }
            }
        }
    ]).toArray();

    const result = (await items.find({}).toArray()).map(item => {
        const stat = stats.find(stat => stat._id.equals(item._id));
        item.sold = stat ? stat.sold : 0;
        item.available = item.quantity - item.sold;
        return item
    });

    res.send(result)
});


async function loadOrdersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://admin:Apollo14@109.235.102.15:27017/pizzaBase?authSource=admin', {
        useNewUrlParser: true
    });

    return client.db('pizzaBase').collection('orders');
}

async function loadDb() {
    const client = await mongodb.MongoClient.connect('mongodb://admin:Apollo14@109.235.102.15:27017/pizzaBase?authSource=admin', {
        useNewUrlParser: true
    })
    return client.db('pizzaBase')
}

module.exports = router;
