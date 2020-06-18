require("dotenv").config();

const path = require('path');

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/techStuff.db3",
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done);
    //   },
    // },
    migrations: {
      directory: path.resolve("data", "migrations")
    },
    seeds: {
      directory:path.resolve("data", "seeds")
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: "./data/test.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: path.resolve("data", "migrations")
    },
    seeds: {
      directory:path.resolve("data", "seeds")
    },
  },
  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/techStuff.db3",
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done);
    //   },
    // },
    migrations: {
      directory: path.resolve("data", "migrations")
    },
    seeds: {
      directory:path.resolve("data", "seeds")
    },
  },
};