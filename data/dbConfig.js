const knex = require("knex");

const knexfile = require("../knexfile.js");

const environment = process.env.NODE_ENV || "development"; //SET TO process.env.DB_ENV to run test suites

module.exports = knex(knexfile[environment]);
