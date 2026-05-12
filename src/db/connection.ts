import Database from 'better-sqlite3'
import type { Database as DB } from 'better-sqlite3'

export const db: DB = new Database('./src/db/db.sqlite')