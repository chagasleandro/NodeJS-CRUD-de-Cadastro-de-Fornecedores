let db = require('../database/database');

class ProdutoController{

    async get(req, res){

        try{

            const produtos = await db.firestore().collection(`produtos`).get();

            const result = [];

            produtos.forEach(produto => {

                let obj = { 
                    id: produto.data().id,  
                    IDFornecedor: produto.data().IDFornecedor,
                    Nome: produto.data().Nome,
                    Descricao: produto.data().Descricao,
                    DataInclusao: produto.data().DataInclusao,
                    Quantidade: produto.data().Quantidade,
                    Price: produto.data().Price,
                    Ativo: produto.data().Ativo
                };

                result.push(obj);

            });

            return res.status(200).json(result);

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async getProdutoById(req, res){

        try{

            const id = req.params.id;

            let produto = await db.firestore().collection(`produtos`).doc(id).get();

            return res.status(200).json(produto.data());

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async create(req, res){

        try{

            const {

                nome,

                IDFornecedor,

                Descricao,

                Quantidade,

                Price

            } = req.body;

            const produto = await db.firestore().collection(`produtos`).add({

                Nome: nome,
                
                IDFornecedor: IDFornecedor,

                Descricao: Descricao,

                DataInclusao: new Date().toLocaleDateString(),

                Quantidade: Quantidade,

                Price: Price,

                Ativo: true

            });

            produto.update({id: produto.id});

            return res.status(200).json({url: `localhost:3000/api/get_produto/${produto.id}`});

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async update_produto(req, res){

        try{

            const id = req.params.id;

            const { nome, quantidade, IdFornecedor, price, ativo } = req.body;

            const produto = await db.firestore().collection(`produtos`).doc(id);

            produto.update({Nome: nome, Quantidade: quantidade, IDFornecedor: IdFornecedor, Ativo: ativo, Price: price});

            return res.status(200).json({url: `localhost:3000/api/get_produto/${produto.id}`});

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async delete(req, res){

        try{

            const id = req.params.id;

            await db.firestore().collection(`produtos`).doc(id).delete();

            return res.status(200).json(`Produto Deletado!`)

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

}

module.exports = new ProdutoController();