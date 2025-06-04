import { Surreal } from 'surrealdb'

export const db = new Surreal()
const dbUrl: string = import.meta.env.VITE_SURREALDB

export const initDB = async () => {
  try {
    await db.connect(dbUrl);
    await db.ready;
    await db.use({ namespace: 'test', database: 'test' });
    return db;
  } catch (err) {
    console.error("Failed to connect to SurrealDB:", err instanceof Error ? err.message : String(err));
    await db.close();
    throw err;
  }
}
