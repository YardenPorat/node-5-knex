const express = require('express');
const path = require('path');

const productRepo = require('./product-repo');

const port = 8080;

const app = express();

// to server static pages
app.use(express.static(path.join(__dirname, '/')));

// for POST json
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/product', async (req, res) => {
    const products = await productRepo.getAllProducts();
    res.status(200).json({ products });
});

app.get('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await productRepo.getProductById(productId);
    res.status(200).json({ product });
});

app.delete('/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const result = await productRepo.deleteProduct(productId);
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/product/${productId}`,
            result,
        });
    } catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message,
        });
    }
});

app.put('/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = req.body;
        const result = await productRepo.updateProduct(product, productId);
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/product/${product.ID}`,
            result,
        });
    } catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message,
        });
    }
});

/**
 * adds a product
 */
app.post('/product', async (req, res) => {
    try {
        const product = req.body;
        const result = await productRepo.addProduct(product);
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/product/${product.ID}`,
            result,
        });
    } catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message,
        });
    }
});

app.listen(port, () => console.log(`Listening to port ${port}`));
