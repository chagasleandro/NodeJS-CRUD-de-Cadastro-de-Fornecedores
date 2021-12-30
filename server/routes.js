const { Router } = require("express");
const path = require("path");

const bp = require("body-parser");

var jsonParser = bp.json();

const routes = new Router();

const FornecedoresController = require('./Controllers/FornecedoresController');
routes.get('/api/fornecedores', FornecedoresController.get);
routes.get('/api/get_fornecedor/:id', FornecedoresController.getFornecedorById);
routes.post('/api/novo_fornecedor', jsonParser, FornecedoresController.create);
routes.put('/api/update_fornecedor/:id', jsonParser, FornecedoresController.update_fornecedor);
routes.delete('/api/delete_fornecedor/:id', FornecedoresController.delete);

routes.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../index.html'));
});
module.exports = routes;