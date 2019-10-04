const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const orders = require('./routes/api/orders');

app.use('/api/orders', orders);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`));
