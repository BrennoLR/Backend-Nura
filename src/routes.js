const express = require('express');
const Cadastro = require('./controllers/cadastro');
const voluntario = require('./controllers/voluntario')
const Login = require('./controllers/login');
const protection = require('./middleware/protection');

const routes = express.Router();

//rotas para cadastro

routes.get('/' ,protection, Cadastro.allusers);
routes.get('/nome/:usu_nome',Cadastro.allusersforname);
routes.get('/codigo/:usu_cod',Cadastro.allusersforcod);
routes.post('/criar',Cadastro.usercreate);
routes.put('/alterar/:usu_cod',Cadastro.userupdate)
routes.delete('/deletar/:usu_cod',Cadastro.userdelete)

//rotas voluntario

routes.get('/',voluntario.allusers);
routes.get('/nome/:usu_nome',voluntario.allusersforname);
routes.get('/codigo/:usu_cod', voluntario.allusersforcod);
routes.post('/criarvol',voluntario.usercreate);
routes.put('/alterar/:usu_cod',voluntario.userupdate)
routes.delete('/deletar/:usu_cod',voluntario.userdelete)

//rotas doador



//rotas ong

//rota para login

routes.get('/login', Login.login)


module.exports = routes;