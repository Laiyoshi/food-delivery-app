// import 'dotenv/config';

// Локальная разработка
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

// Для Turso в CI
// import { drizzle } from 'drizzle-orm/libsql'
// import { createClient } from '@libsql/client';

// оставить для всех
import * as schema from './schema';

// Локальная разработка
const sqlite = new Database('sqlite.db');
export const db = drizzle({ client: sqlite, schema });

// Для Turso в CI
// const turso = createClient({
//   url: process.env.DATABASE_URL!,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });
// export const db = drizzle({ client: turso, schema })
