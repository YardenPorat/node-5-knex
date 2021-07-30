// knex-connector.js
const knex = require('knex');

// knex connector
const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'company.db',
    },
});

module.exports = connectedKnex;
