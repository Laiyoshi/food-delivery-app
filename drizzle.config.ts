import { defineConfig } from 'drizzle-kit';

// local
// export default defineConfig({
//   schema: './src/db/schema.ts',
//   out: './src/db/',
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: 'file:./sqlite.db',
//   },
// });

// turso
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  }
})
