const knex = require('../data/index');
const bcrypt = require('bcrypt');


module.exports = {
    async allusers(req, res) {
        const result = await knex('ong').orderBy('ong_cod');

        return res.status(200).send(result);
    },
    async allusersforname(req, res) {
        const { ong_nome } = req.params;
        const result = await knex('ong').where('ong_nome', 'like', '%' + ong_nome + '%').orderBy('ong_cod');
        return res.status(200).send(result);
    },
    async allusersforcod(req, res) {
        const { ong_cod } = req.params;
        const result = await knex('ong').where('ong_cod', '=', ong_cod).orderBy('ong_cod');
        return res.status(200).send(result);
    },

    async usercreate(req, res) {
        const { ong_nome } = req.body;
        const { ong_email } = req.body;
        const ong_senha = await bcrypt.hash(req.body.ong_senha, 20);
        const validar = await knex('ong')
            .where('ong_email', '=', ong_email)
            .first()
        if (validar) {
            return res.status(400).send("Email já existente, utilize outro!")
        } else {
            await knex('ong').insert({
                "ong_nome": ong_nome,
                "ong_email": ong_email,
                "ong_senha": ong_senha,
            })
            return res.status(201).send("Dados Inseridos");
        }
    },

    async userupdate(req, res) {
        const { ong_cod } = req.params;
        const { ong_nome } = req.body;
        const { ong_email } = req.body;
        const { ong_senha } = req.body;
        await knex('ong').update({
            ong_nome,
            ong_email,
            ong_senha
        }).where({ ong_cod });
        return res.status(201).send("Dados alterados")
    },

    async userdelete(req, res) {
        const { ong_cod } = req.params;
        await knex('ong')
            .where({ ong_cod })
            .del();
        return res.status(200).send("Dados deletados");
    }
}