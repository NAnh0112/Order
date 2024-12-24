const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json())

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
 
app.use((req, res, next) => {
    res.status(404).send({ error: 'Route not found!' });
}); 



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});