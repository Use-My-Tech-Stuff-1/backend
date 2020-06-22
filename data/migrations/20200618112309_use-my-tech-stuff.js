exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("role_id");
      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments().primary();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 256).notNullable().unique();
      tbl
        .integer("role")
        .unsigned()
        .references("roles.role_id")
        .defaultTo(2)
        .onDelete("restrict")
        .onUpdate("cascade");
    })
    // .createTable("owners", (tbl) => {
    //   tbl.integer("owner_id").references("users.id").onDelete("cascade")
    //   tbl.integer("product_id").references("products.prod_id").onDelete("cascade")
    // })
    .createTable("borrowers", (tbl) => {
      tbl.integer("borrower_id").references("users.id").onDelete("cascade")
      tbl.integer("p_id").references("products.prod_id").onDelete("cascade")
    })
    .createTable("products", (tbl) => {
      tbl.increments("prod_id");
      tbl.string("name", 256).notNullable();
      tbl.string("image_URL", 256).notNullable();
      tbl.text("price").notNullable();
      tbl.text("content").notNullable();
      tbl
      .integer("owner")
      .unsigned()
      .notNullable()
      .references("users.id")
      .onUpdate("cascade")
      .onDelete("cascade");
    // tbl.boolean("available").defaultTo(true);
    // tbl
    //   .integer("borrower")
    //   .unsigned()
    //   .references("borrowers.borrower_id")
    //   .onDelete("cascade")
    //   .onUpdate("cascade");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("products")
    .dropTableIfExists("borrowers")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
    
};

// .createTable("lending", (tbl) => {
//     tbl.increments();
//     tbl
//       .integer("ownerID")
//       .unsigned()
//       .references("id")
//       .inTable("users")
//       .onDelete("cascade")
//       .onUpdate("cascade");
//   })
//   .createTable("borrowing", (tbl) => {
//       tbl.increments();
//       tbl
//         .integer("borrowerID")
//         .unsigned()
//         .references("id")
//         .inTable("users")
//         .onDelete("cascade")
//         .onUpdate("cascade");
//     })
