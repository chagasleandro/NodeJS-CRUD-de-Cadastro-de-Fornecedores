const db = require('../database/database');

class ContratoController {

    async get(req, res) {

        try {

            const contratos = await db.firestore().collection(`contratos`).get();

            const result = [];

            contratos.forEach(contrato => {

                let obj = {

                    id: contrato.data().id,

                    IDFornecedor: contrato.data().IDFornecedor,

                    DocContrato: contrato.data().DocContrato,

                    DataVencimento: contrato.data().DataVencimento,

                    Ativo: contrato.data().Ativo

                };

                result.push(obj);

            });

            return res.status(200).json(result);

        } catch (e) {

            return res.status(400).json(e.message);

        }

    }

    async getContratoById(req, res) {

        try {

            const id = req.params.id;

            let contrato = await db.firestore().collection(`contratos`).doc(id).get();

            return res.status(200).json(contrato.data());

        } catch (e) {

            return res.status(400).json(e.message);

        }

    }    
    
    async create(req, res) {
        try {
        
            const {
        
                idFornecedor,
        
                docContrato
        
            } = req.body;
        
            const contrato = await db.firestore().collection(`contratos`).add({
        
                IDFornecedor: idFornecedor,
        
                DocContrato: docContrato,
        
                DataVencimento: new Date().toLocaleDateString(),
        
                Ativo: true
        
            });
        
            contrato.update({ id: contrato.id });
        
            return res.status(200).json({ url: `localhost:3000/api/get_contrato/${contrato.id}` });
        
        } catch (e) {
        
            return res.status(400).json(e.message);
        }
    }
    
    async update_contrato(req, res) {
        try {
        
            const id = req.params.id;
        
            const { idFornecedor, ativo, docContrato, dataVencimento } = req.body;
        
            const contrato = await db.firestore().collection(`contratos`).doc(id);
        
            contrato.update({ IDFornecedor: idFornecedor, Ativo: ativo, DocContrato: docContrato, DataVencimento: dataVencimento });
        
            return res.status(200).json({ url: `localhost:3000/api/get_contrato/${contrato.id}` });
        
        } catch (e) {
        
            return res.status(400).json(e.message);
        }
    }
        
    async delete(req, res) {
        try {
        
            const id = req.params.id;
        
            await db.firestore().collection(`contratos`).doc(id).delete();
        
            return res.status(200).json(`contrato Deletado!`)
        
        } catch (e) {
        
            return res.status(400).json(e.message);
        }
    }
}

module.exports = new ContratoController();