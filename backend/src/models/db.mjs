import sqlite3 from "sqlite3";

/**
 * Crea una base de datos
 */

export const db = new sqlite3.Database('./news.db', (err)=>{

    if (err) {
        throw err.message;
    }
    console.log("Connected to the News Database");
});
/**
 * Crea la tabla de datos NEWS
 */

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        news(
            id_news INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            summary TEXT NOT NULL,
            content VARCHAR(1000) NOT NULL
        )
`);

