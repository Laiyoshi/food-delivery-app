import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator'

import { db } from '.'

const main = () => {
  try {
    migrate(db, { migrationsFolder: 'src/db/migrations' })
    console.log('Migrating...')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
