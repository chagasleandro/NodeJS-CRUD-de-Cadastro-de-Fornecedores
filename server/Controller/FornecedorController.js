const db = require("../database/database");

class FornecedorController{

    async get(req, res){

        try{

            const fornecedoresData = await db.firestore().collection(`fornecedores`).get();

            const result = [];

            fornecedoresData.forEach(doc => {

                const obj = {

                    id: doc.data().id,

                    Nome: doc.data().Nome,

                    NomeFantasia: doc.data().NomeFantasia,

                    CNPJ: doc.data().CNPJ,

                    Ativo: doc.data().Ativo

                }

                result.push(obj);

            });

            return res.status(200).json(result);

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async getFornecedorById(req, res){

        try{

            const id = req.params.id;

            const fornecedorData = await db.firestore().collection(`fornecedores`).doc(id).get();

            return res.status(200).json(fornecedorData.data());

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async create(req, res){

        try{

            const {

                nome,

                nomeFantasia,

                cnpj

            } = req.body;

            const fornecedor = await db.firestore().collection(`fornecedores`).add({

                Nome: nome,

                NomeFantasia: nomeFantasia,

                CNPJ: cnpj,

                Ativo: true

            })

            fornecedor.update({id: fornecedor.id});

            res.status(200).json({url: `localhost:3000/api/fornecedores/${fornecedor.id}`});

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async update_fornecedor(req, res){

        try{

            const id = req.params.id;

            const { nome, nomeFantasia, cnpj, ativo } = req.body;

            const fornecedor = await db.firestore().collection(`fornecedores`).doc(id);

            fornecedor.update({Nome: nome, NomeFantasia: nomeFantasia, CNPJ: cnpj, Ativo: ativo});

            return res.status(200).json({url: `localhost:3000/api/fornecedores/${fornecedor.id}`});

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

    async delete(req, res){

        try{

            const id = req.params.id;

            await db.firestore().collection(`fornecedores`).doc(id).delete();

            return res.status(200).json(`Fornecedor Deletado!`)

        } catch(e){

            return res.status(400).json(e.message);

        }

    }

}

module.exports = new FornecedorController();