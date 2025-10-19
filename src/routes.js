const express = require('express');
const Cadastro = require('./controllers/cadastro');
const voluntario = require('./controllers/voluntario')
const Login = require('./controllers/login');
const protection = require('./middleware/protection');
const CampCont = require('./controllers/Campanha');
const Doador = require('./controllers/doador')
const ong = require('./controllers/ong')

const routes = express.Router();

//rotas para cadastro

routes.get('/', protection, Cadastro.allusers);
routes.get('/nome/:usu_nome',Cadastro.allusersforname);
routes.get('/codigo/:usu_cod',Cadastro.allusersforcod);
routes.post('/criar',Cadastro.usercreate);
routes.put('/alterar/:usu_cod',Cadastro.userupdate)
routes.delete('/deletar/:usu_cod',Cadastro.userdelete)

//rotas voluntario

routes.get('/voluntario',voluntario.allvol);
routes.get('/nomevol/:usu_nome',voluntario.allvolforname);
routes.get('/codvol/:usu_cod', voluntario.allvolforcod);
routes.post('/createvol',voluntario.volcreate);
routes.put('/updatevol/:usu_cod',voluntario.volupdate)
routes.delete('/deletevol/:usu_cod',voluntario.voldelete)

//rotas ong

routes.get('/voluntario',ong.allong);
routes.get('/nomevol/:usu_nome',ong.allongforname);
routes.get('/codvol/:usu_cod', ong.allongforcod);
routes.post('/createvol',ong.ongcreate);
routes.put('/updatevol/:usu_cod',ong.ongupdate)
routes.delete('/deletevol/:usu_cod',ong.ongdelete)

//rotas doador

routes.get('/doador',Doador.alldoador);
routes.get('/nomedoa/:usu_nome',Doador.alldoadorforname);
routes.get('/coddoa/:usu_cod', Doador.alldoadorforcod);
routes.post('/createdoa',Doador.doadorcreate);
routes.put('/updatedoa/:usu_cod',Doador.doadorupdate)
routes.delete('/deletedao/:usu_cod',Doador.doadordelete)

//rotas campanha

routes.get('/camp',CampCont.allCampaigns);
routes.get('/nomecamp/:vol_nome',CampCont.allCampaignsforname);
routes.get('/codcamp/:vol_cod',CampCont.allCampaignsforcod);
routes.post('/createcamp',CampCont.createCampaigns);//
routes.put('/updatecamp/:vol_cod',CampCont.updateCampaigns)
routes.delete('/deletecamp/:vol_cod',CampCont.deleteCampaigns)

//rota para login

routes.post('/login', Login.login)


module.exports = routes;