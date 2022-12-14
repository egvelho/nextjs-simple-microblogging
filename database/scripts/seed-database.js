require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const { faker } = require("@faker-js/faker");

function generateUser() {
  return {
    username: faker.internet.userName().toLowerCase(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
}

function generatePost(userId) {
  return {
    message: faker.lorem.sentences(1),
    userId,
  };
}

(async () => {
  const insertUserQuery = (
    await fs.promises.readFile("database/sql/insert-user.sql")
  ).toString();

  const insertPostQuery = (
    await fs.promises.readFile("database/sql/insert-post.sql")
  ).toString();

  const pgClient = new Client(process.env.DATABASE_URL);
  await pgClient.connect();

  const usersToInsert = Array.from({ length: 12 }).map(() => generateUser());

  let usersIds = [];

  for (const user of usersToInsert) {
    const userRes = await pgClient.query(insertUserQuery, Object.values(user));
    usersIds.push(userRes.rows[0].id);
    console.log(userRes);
  }

  const postsToInsert = Array.from({
    length: 50,
  }).map(() =>
    generatePost(usersIds[parseInt(Math.random() * usersIds.length)])
  );

  for (const post of postsToInsert) {
    const postRes = await pgClient.query(insertPostQuery, Object.values(post));
    console.log(postRes);
  }

  await pgClient.end();
})();
