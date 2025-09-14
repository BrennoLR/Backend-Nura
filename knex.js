require('dotenv').config();
const config = {
    develop:{
        client:'postgresql',
        connection: process.env.DATABASE_URL        
    }
}   
module.exports = config;