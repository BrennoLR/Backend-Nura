const express = require('express');
const ONGCont = require('./controllers/ONG');

const routes = express.Router();

routes.get('/',ONGCont.allusers);
routes.get('/:ong_nome',ONGCont.allusersforname);
routes.get('/concod/:ong_cod',ONGCont.allusersforcod);
routes.post('/create',ONGCont.usercreate);
routes.put('/alterar/:ong_cod',ONGCont.userupdate)
routes.delete('/deletar/:ong_cod',ONGCont.userdelete)


module.exports = routes;