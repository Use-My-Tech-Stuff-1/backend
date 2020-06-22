const crypt = require("bcryptjs");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: crypt.hashSync("password", 12),
          email: "user@email.com",
          role: 1
        },
        {
          username: "poweruser",
          password: crypt.hashSync("qwerty", 12),
          email: "poweruser@email.com",
          role: 2
        },
        {
          username: "Jon",
          password: crypt.hashSync("test", 12),
          email: "jon@email.com",
          role: 2
        },
        {
          username: "Trevor",
          password: crypt.hashSync("test", 12),
          email: "trevor@email.com",
          role: 2
        },
        {
          username: "Chanis",
          password: crypt.hashSync("test", 12),
          email: "chanis@email.com",
          role: 2
        },
        {
          username: "Karla",
          password: crypt.hashSync("test", 12),
          email: "karla@email.com",
          role: 2
        },
      ]);
    });
};