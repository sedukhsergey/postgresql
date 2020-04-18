const sqlite3 = require('sqlite3').verbose();

const dbName = 'later.sqlite';

const db = new sqlite3.Database(dbName);
db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content)
  `;

  const usersSql = `
    CREATE TABLE IF NOT EXISTS users
    (id integer primary key, name, city)
`;
  const tracksSql = `
    CREATE TABLE IF NOT EXISTS users
    (id integer primary key, name, composer, milliseconds)
  `;

  db.run(sql);
  db.run(usersSql);
  db.run(tracksSql);
});

module.exports = db;
