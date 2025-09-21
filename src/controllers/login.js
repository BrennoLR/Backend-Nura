const knex = require('../data/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        const { usu_email, usu_senha } = req.body;

        if (!usu_email || !usu_senha) {
            return res.status(401).send({ Message: "Email ou senha não informados" });
        }
        try {
            const users = await knex('usuarios').where({ usu_email }).first();
            if (!users) {
                return res.status(401).send({ Message: "Email incorreto!" });
            }
            const senha = await bcrypt.compare(usu_senha, users.usu_senha);
            if (!senha) {
                return res.status(401).send({ Message: "Senha incorreta!" });
            }
            const token = jwt.sign(
                {
                    usu_nome: users.usu_nome,
                    usu_email: users.usu_email,
                },
                process.env.CHAVE_JWT,
                { expiresIn: '2h' }
            );
            return res.status(200).json({
                message: 'Login realizado com sucesso!',
                token,
            });
        } catch (error) {
            return res.status(500).send({ Message: "Erro do servidor!" });
        }
    }
};
