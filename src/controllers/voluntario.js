const knex = require('../data/index');
const bcrypt = require('bcrypt');

module.exports = {
    async allvol(req, res) {
        const allusers = await knex('voluntario').orderBy('usu_cod');
        return res.status(200).send(allusers);
    },
    async allvolforname(req, res) {
        const { usu_nome } = req.params;
        const allusersforname = await knex('voluntario').where('usu_nome', 'like', '%' + usu_nome + '%').orderBy('usu_cod');
        return res.status(200).send(allusersforname);
    },
    async allvolforcod(req, res) {
        const { usu_cod } = req.params;
        const allusersforcod = await knex('voluntario').where('usu_cod', '=', usu_cod).orderBy('usu_cod');
        return res.status(200).send(allusersforcod);
    },
    async volcreate(req, res) {
        const { usu_nome } = req.body;
        const { usu_email } = req.body;
        const { usu_cnpj } = req.body
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);
        const { usu_tipo } = req.body;

        await knex('voluntario').insert({
            "usu_nome": usu_nome,
            "usu_email": usu_email,
            "usu_senha": usu_senha,
            "usu_cnpj": usu_cnpj,
            "usu_tipo": usu_tipo,
        });
        return res.status(201).send({ Message: "Dados Inseridos" });
    },
    async volupdate(req, res) {
        const { usu_cod } = req.params;
        const { usu_nome } = req.body;
        const { usu_telefone } = req.body
        const { usu_datanasc } = req.body
        const { usu_cnpj } = req.body
        const usu_senha = await bcrypt.hash(req.body.usu_senha, 10);
        const { vol_genero } = req.body

        await knex('voluntario').update({
            usu_nome,
            usu_senha,
            usu_telefone,
            usu_datanasc,
            usu_cnpj,
            vol_genero,
        }).where({ usu_cod });
        return res.status(201).send({ Message: "Dados alterados" })
    },
    async voldelete(req, res) {
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