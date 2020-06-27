const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

let token;
let userID;


beforeEach(async () => {
  await db("users").truncate();
  const register = await request(server).post("/api/auth/register").send({
    username: "testbot",
    password: "qwerty",
    email: "test@qwertry.com",
  });
  const res = await request(server)
    .post("/api/auth/login")
    .send({ username: "testbot", password: "qwerty" });
  token = res.body.token;

});


describe("users-router.js", () => {
  describe("POST /register", () => {
    it("should return 201", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({
          username: "abcde",
          password: "qwerty",
          email: "test@qwertyuiop.com",
        });
      expect(res.status).toBe(201);
    });
    it("should return 400", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: true, password: null, email: null });
      expect(res.status).toBe(400);
    });

    it('should have a message of "Good job registering, ${username}" upon registering', async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "abcde",
        password: "qwerty",
        email: "test@qwertyuio.com",
      });
      let response = JSON.parse(res.text);
      expect(response.message).toBe(`Good job registering, abcde`);
    });

    //END OF POST REGISTER BLOCK
  });

  describe("POST /login", () => {
    it("should return 200", async () => {
      const register = await request(server).post("/api/auth/register").send({
        username: "abcd",
        password: "qwerty",
        email: "test@qwerty.com",
      });
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "abcd", password: "qwerty" });
      expect(res.status).toBe(200);
    });

    it('login message should be - "Welcome to our API, testbot"', async () => {
      const register = await request(server).post("/api/auth/register").send({
        username: "testbot",
        password: "qwerty",
        email: "test@qwertry.com",
      });
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "testbot", password: "qwerty" });
      let response = JSON.parse(res.text);
      expect(response.message).toBe("Welcome to our API, testbot");
    });

    it("should return 401", async () => {
      const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "abcd", password: "qwerty" });
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "abcd", password: "12345" });
      expect(res.status).toBe(401);
    });

    it("login error message should be - Invalid credentials", async () => {
      const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "testbot", password: "qwerty" });
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "testbot", password: "12345" });
      let response = JSON.parse(res.text);
      expect(response.message).toBe("Invalid credentials");
    });
  });
});

const postInfo = {
  name: "Name",
  price: "Price here",
  image_URL: "image.com",
  content: "About the product text",
  owner: 1,
};
const postInfo2 = {
    name: "asdff",
    price: "Price here fsadf",
    image_URL: "image.net",
    content: "About the product sdfasdf text",
    owner: 1,
  };
const expected = JSON.stringify(postInfo);

describe("product-routes.js", () => {
  describe("/POST", () => {
    it("should return a bunch of data", async () => {
      console.log(token);

      const postProduct = await request(server)
        .post("/api/product")
        .set("Authorization", token)
        .send(postInfo);
    //   const rez = await request(server).get("/api/product");
      const prodRes = postProduct.body.product;
      const recieved = JSON.stringify(prodRes);

      console.log(prodRes);
      console.log("RECIEVED", recieved);
      console.log("EXPECTED", expected);
      expect(recieved).toBe(expected);
    });
  });
    describe("/GET", () => {
    it("should return all projects, value text should match the POST, should return the two posted objects", async () => {
        const postProduct = await request(server)
        .post("/api/product")
        .set("Authorization", token)
        .send([postInfo, postInfo2])

      const getProducts = await request(server)
        .get("/api/product")
        .set("Authorization", token);
      console.log("PRODUCTS", getProducts.body);
      const products = JSON.stringify(getProducts.body);
      console.log("LENGTH", getProducts.body.length);
      expect(products).toContain('image.com');
      expect(getProducts.body.length).toEqual(2);
    });
  });
});
