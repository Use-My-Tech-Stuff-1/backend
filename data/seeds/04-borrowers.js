const crypt = require("bcryptjs");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("borrowers")
    .then(function () {
      // Inserts seed entries
      return knex("borrowers").insert([
        {
          borrower_id: 4,
          p_id: 1,
        },
        {
          borrower_id: 5,
          p_id: 2,
        },
        {
          borrower_id: 6,
          p_id: 3,
        },
      ]);
    });
};