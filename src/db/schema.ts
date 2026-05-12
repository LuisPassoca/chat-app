import * as fs from "fs";
import { db } from "./connection.js";

db.exec(fs.readFileSync('./src/db/schema.sql', 'utf8'))
console.log('Successfully loaded schema!')