exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("borrowing")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("borrowing").insert([
        {
          borrowerID: "4"
        },
        {
          borrowerID: "5"
        },
        {
          borrowerID: "6"
        },
      ]);
    });
};