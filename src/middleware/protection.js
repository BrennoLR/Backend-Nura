const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ Message: 'Requisição sem token' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Token inválido' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token fora do padrão esperado' });
    }

    try {
        const verify = jwt.verify(token, process.env.CHAVE_JWT);
        req.user = verify;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Token inválido ou expirado' });
    }
};