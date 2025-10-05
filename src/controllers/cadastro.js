const knex = require('../data/index');
const bcrypt = require('bcrypt');


module.exports = {

    async verifyemail(usu_email) {
        return await knex('usuarios')
            .where('usu_email', '=', usu_email)
            .first()
    },
    async verifycod(usu_cod) {
        return await knex('usuarios')
            .where('usu_cod', '=', usu_cod)
            .first()
    },
    async allusers(res) {
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
        const { usu_cnpj } = req.body
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);

        await knex('usuarios').insert({
            "usu_nome": usu_nome,
            "usu_email": usu_email,
            "usu_senha": usu_senha,
            "usu_telefone": usu_telefone,
            "usu_genero": usu_genero,
            "usu_cnpj": usu_cnpj,
        });
        return res.status(201).send({ Message: "Dados Inseridos" });
    },
    async userupdate(req, res) {
        const { usu_cod } = req.params;
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
        if (await this.verifycod(usu_cod)) {
            await knex('usuarios')
                .where({ usu_cod })
                .del();
            return res.status(200).send({ Message: "Dados deletados" });
        }
        else if (!this.verifycod) {
            return res.status(201).send({ Message: "Código inexistente" })
        }
    }
}