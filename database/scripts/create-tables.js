require("dotenv").config();
const fs = require("fs");
const { Client } = require("pg");

(async () => {
  const createTablesQuery = (
    await fs.promises.readFile("database/sql/create-tables.sql")
  ).toString();

  const pgClient = new Client(process.env.DATABASE_URL);
  await pgClient.connect();

  const response = await pgClient.query(createTablesQuery);
  console.log(response);
  await pgClient.end();
})();
