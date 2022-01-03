const { Router } = require("express");
const path = require("path");

const bp = require("body-parser");

var jsonParser = bp.json();

const routes = new Router();

const FornecedorController = require('./Controller/FornecedorController');
const ProdutoController = require('./Controller/ProdutoController');
const ContratoController = require('./Controller/ContratoController');

routes.get('/api/fornecedores', FornecedorController.get);
routes.get('/api/get_fornecedor/:id', FornecedorController.getFornecedorById);
routes.post('/api/novo_fornecedor', jsonParser, FornecedorController.create);
routes.put('/api/update_fornecedor/:id', jsonParser, FornecedorController.update_fornecedor);
routes.delete('/api/delete_fornecedor/:id', FornecedorController.delete);

routes.get('/api/produtos', ProdutoController.get);
routes.get('/api/get_produto/:id', ProdutoController.getProdutoById);
routes.post('/api/novo_produto', jsonParser, ProdutoController.create);
routes.put('/api/update_produto/:id', jsonParser, ProdutoController.update_produto);
routes.delete('/api/delete_produto/:id', ProdutoController.delete);

routes.get('/api/contratos', ContratoController.get);
routes.get('/api/get_contrato/:id', ContratoController.getContratoById);
routes.post('/api/novo_contrato', jsonParser, ContratoController.create);
routes.put('/api/update_contrato/:id', jsonParser, ContratoController.update_contrato);
routes.delete('/api/delete_contrato/:id', ContratoController.delete);

routes.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = routes;