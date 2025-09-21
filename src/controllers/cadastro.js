const knex = require('../data/index');
const bcrypt = require('bcrypt');


module.exports = {
    async allusers(req, res) {
        const allusers = await knex('usuarios').orderBy('usu_cod');

        return res.status(200).send(allusers);
    },
    async allusersforname(req, res) {
        const { usu_nome } = req.params;
        const allusersforname = await knex('usuarios').where('usu_nome', 'like', '%' + usu_nome + '%').orderBy('usu_cod');
        return res.status(200).send(allusersforname);
    },
    async allusersforcod(req, res) {
        const { usu_cod } = req.params;
        const allusersforcod = await knex('usuarios').where('usu_cod', '=', usu_cod).orderBy('usu_cod');
        return res.status(200).send(allusersforcod);
    },
    async usercreate(req, res) {
        const { usu_nome } = req.body;
        const { usu_email } = req.body;
        const { usu_telefone } = req.body
        const { usu_genero } = req.body
        const { usu_datanasc } = req.body
        const { usu_cnpj } = req.body
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);
        const validar = await knex('usuarios')
            .where('usu_email', '=', usu_email)
            .first()
        if (validar) {
            return res.status(400).send({ Message: "Email já utilizado, utilize outro!" })
        } else {
            await knex('usuarios').insert({
                "usu_nome": usu_nome,
                "usu_email": usu_email,
                "usu_senha": usu_senha,
                "usu_telefone": usu_telefone,
                "usu_genero": usu_genero,
                "usu_datanasc": usu_datanasc,
                "usu_cnpj": usu_cnpj,
            });
            return res.status(201).send({ Message: "Dados Inseridos" });
        }
    },
    async userupdate(req, res) {
        const { ong_cod } = req.params;
        const { usu_nome } = req.body;
        const { usu_email } = req.body;
        const { usu_telefone } = req.body
        const { usu_genero } = req.body
        const { usu_datanasc } = req.body
        const { usu_cnpj } = req.body
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);
        await knex('usuarios').update({
            usu_nome,
            usu_email,
            usu_senha,
            usu_telefone,
            usu_genero,
            usu_datanasc,
            usu_cnpj
        }).where({ usu_cod });
        return res.status(201).send({ Message: "Dados alterados" })
    },
    async userdelete(req, res) {
        const { usu_cod } = req.params;
        await knex('usuarios')
            .where({ usu_cod })
            .del();
        return res.status(200).send({ Message: "Dados deletados" });
    }
}