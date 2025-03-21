import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema'

// const sqlite = new Database('sqlite.db')
// const sqlitePath = path.join(process.cwd(), "public", "database", "sqlite.db");
const sqlite = new Database('public/database/sqlite.db')

//const sqlite = new Database(sqlitePath, { readonly: true })
export const db = drizzle({ client: sqlite, schema })
