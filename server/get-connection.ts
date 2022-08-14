import { createPool, DatabasePool } from "slonik";
export { sql } from "slonik";

let pool: DatabasePool;

export async function getConnection() {
  if (pool === undefined) {
    pool = await createPool(process.env.DATABASE_URL as string);
  }

  return pool.connect;
}
