import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema'
import path from 'path';

// const sqlite = new Database('sqlite.db')

const sqlitePath = path.join(process.cwd(), "database", "sqlite.db");
const sqlite = new Database(sqlitePath, { readonly: true });
export const db = drizzle({ client: sqlite, schema })
