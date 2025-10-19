const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(routes)

app.listen(process.env.PORTA_SERVIDOR ?? 1914, 
    ()=> process.env.PORTA_SERVIDOR ? console.log('Servidor ativo na porta definida manualmente, porta: ' + process.env.PORTA_SERVIDOR) : 
    console.log('Servidor ativo na porta definida por padrão, porta: ' + 1914));