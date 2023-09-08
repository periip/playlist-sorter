const knex = require('knex') 
const config = require("./utils/config.js");

module.exports = knex({
    client: 'pg',
    connection: {
        host: config.DATABASE_HOST,
        user: config.DATABASE_USERNAME,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE,
    },
});