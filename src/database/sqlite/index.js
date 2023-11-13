const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function openDataBase() {
    const db = await open({
        filename: path.resolve(__dirname, '..', 'database.db'),
        driver: sqlite3.Database,
    });
    return db;
}

module.exports = openDataBase;
