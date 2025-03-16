import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/',
  dialect: 'sqlite',
  dbCredentials: {
    url: "file:./sqlite.db"
  }
})