exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .then(function () {
      // Inserts seed entries
      return knex("products").insert([
        {
          name: "iPhone 5s",
          image_URL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/IPhone_5s_golden.svg/800px-IPhone_5s_golden.svg.png",
          price: "$5/month",
          content: "Working condition gold iPhone 5s, 64GB storage, unlocked, minor scratches",
          // available: false,
          owner: 1,
          // borrower: 4
        },
        {
          name: "iPhone 6s",
          image_URL: "https://en.wikipedia.org/wiki/IPhone_6S#/media/File:IPhone_6s_vector.svg",
          price: "$6/month",
          content: "Working condition rose gold iPhone 6s, 64GB storage, unlocked, some battery degredation",
          // available: false,
          owner: 2,
          // borrower: 5
        },
        {
          name: "iPhone 7s",
          image_URL: "https://en.wikipedia.org/wiki/IPhone_7#/media/File:IPhone_7_Jet_Black.svg",
          price: "$7/month",
          content: "Mint condition jet black iPhone 7s, 64GB storage, unlocked, dual sim",
          // available: false,
          owner: 3,
          // borrower: 6
        },
        {
          name: "Rasperry Pie",
          image_URL: "https://www.theblackpeppercorn.com/wp-content/uploads/2013/09/Classic-Raspberry-Pie-Featured-1-700x394.jpg",
          price: "$700/month",
          content: "An actualy Raspberry Pie, and not the mini computer",
          // available: true,
          owner: 1,
          // borrower: null
        },
      ]);
    });
};


