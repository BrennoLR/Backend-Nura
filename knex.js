require('dotenv').config();
const config = {
    develop:{
        client:'postgresql',
        connection: process.env.CHAVE_BANCODEDADOS        
    }
}   
module.exports = config;