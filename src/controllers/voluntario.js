const knex = require('../data/index');
const bcrypt = require('bcrypt');


module.exports = {

    async verifycod(usu_cod) {
        return knex('usuarios')
            .where('usu_cod', usu_cod)
            .first();
    },
    async allusers(res) {
        const allusers = await knex('voluntario').orderBy('usu_cod');

        return res.status(200).send(allusers);
    },
    async allusersforname(req, res) {
        const { usu_nome } = req.params;
        const allusersforname = await knex('voluntario').where('usu_nome', 'like', '%' + usu_nome + '%').orderBy('usu_cod');
        return res.status(200).send(allusersforname);
    },
    async allusersforcod(req, res) {
        const { usu_cod } = req.params;
        const allusersforcod = await knex('voluntario').where('usu_cod', '=', usu_cod).orderBy('usu_cod');
        return res.status(200).send(allusersforcod);
    },
    async usercreate(req, res) {
        const { usu_nome } = req.body;
        const { usu_email } = req.body;
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);
        const verifyemail =
            knex('usuarios')
                .where(usu_email)
                .first();
        ;
        const verifyname =
            knex('usuarios')
                .where(usu_nome)
                .first();
        if (!verifyemail || !verifyname) {
            await knex('voluntario').insert({
                "usu_nome": usu_nome,
                "usu_email": usu_email,
                "usu_senha": usu_senha,
            });
            return res.status(201).send({ Message: "Dados Inseridos" });
        }
        else {
            return res.status(400).send({ Message: "Nome ou email já existentes!!!" });
        }
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
        await knex('voluntario').update({
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
            await knex('voluntario')
                .where({ usu_cod })
                .del();
            return res.status(200).send({ Message: "Dados deletados" });
        }
        else {
            return res.status(404).send({ Message: "Código inexistente" })
        }
    }
}