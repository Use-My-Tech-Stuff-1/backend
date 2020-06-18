exports.up = function (knex) {
  return knex.schema

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 256).notNullable().unique();
      tbl
        .integer("role")
        .unsigned()
        .references("roles.id")
        .defaultTo(2)
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("products", (tbl) => {
      tbl.increments();
      tbl.string("name", 256).notNullable();
      tbl.string("image_URL", 256).notNullable();
      tbl.text("price").notNullable();
      tbl.text("content").notNullable();
      tbl
        .integer("owner")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.boolean("available");
      tbl
        .integer("borrower")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("products")

    .dropTableIfExists("roles")
    .dropTableIfExists("users");
};

// .createTable("lending", (tbl) => {
//     tbl.increments();
//     tbl
//       .integer("ownerID")
//       .unsigned()
//       .references("id")
//       .inTable("users")
//       .onDelete("CASCADE")
//       .onUpdate("CASCADE");
//   })
//   .createTable("borrowing", (tbl) => {
//       tbl.increments();
//       tbl
//         .integer("borrowerID")
//         .unsigned()
//         .references("id")
//         .inTable("users")
//         .onDelete("CASCADE")
//         .onUpdate("CASCADE");
//     })
