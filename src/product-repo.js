// emp-repo.js
const connectedKnex = require('./knex-connector');

function getAllProducts() {
    return connectedKnex('products').select('*');
}

function getProductById(id) {
    return connectedKnex('products').select('*').where('id', id).first();
}

function addProduct(products) {
    return connectedKnex('products').insert(products);
}

function updateProduct(products, id) {
    return connectedKnex('products').where('id', id).update(products);
}

function deleteProduct(id) {
    return connectedKnex('products').where('id', id).del();
}

module.exports = {
    getProductById,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
