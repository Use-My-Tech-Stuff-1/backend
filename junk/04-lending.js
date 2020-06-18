exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("lending")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("lending").insert([
        {
          ownerID: "1"
        },
        {
          ownerID: "2"
        },
        {
          ownerID: "3"
        },
      ]);
    });
};