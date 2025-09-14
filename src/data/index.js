const knexf = require('../../knex');

const knex = require('knex')(knexf['develop']);

module.exports = knex;