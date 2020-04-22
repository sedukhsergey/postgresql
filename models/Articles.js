const pool = require('./db');
const ArticlesUsers = require('./ArticlesUsers');
const Users = require('./Users');
const shouldAbort = require('../utils/shouldTransactionAbort');


class Articles {
  static async find(id) {
    const sql = 'SELECT * FROM articles WHERE id = $1';
    try{
    const result = await pool.query(sql, [id]);
      return new Promise(res => res(result.rows[0] || null))
    }
    catch(err) {
      return new Promise((res, rej) => rej(err))
    }
  }

  static async all() {
    const sql = 'SELECT * FROM articles';
    try {
      const result = await pool.query(sql);
      return new Promise(resolve => resolve(result.rows))
    }
    catch(err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  }

  static create(data, cb) {
    pool.connect( async (err, client, done) => {
      const some = await client.query('BEGIN', async err => {
        if (err) {
          shouldAbort(err, client)
        }
        const response = await Users.find(data.authorId);
        const user = response[0];
        const articlesSql = 'INSERT INTO articles(name, author) VALUES($1, $2) RETURNING id';
        const articles = await client.query(articlesSql, [data.name, user.name]);
        await ArticlesUsers.create({
          articleId: articles.rows[0].id,
          authorId: user.id
        });
        client.query('COMMIT', err => {
          if (err) {
            return cb(err, null);
          }
          done()
          cb(null, articles.rows[0].id);
        })
      })
    })
  }

  static async update(data) {
    const sql = 'UPDATE articles SET name = $1 WHERE id = $2';
    try {
      const result = await pool.query(sql, [data.name, data.id])
      return new Promise((resolve, reject) => {
        resolve(result.rows)
      })
    } catch(err) {
      return new Promise((resolve, reject) => {
        return reject(err)
      })
    }
  }

  static async delete(data) {
    const sql = 'DELETE FROM articles WHERE id = $1 RETURNING id';
    try {
      const results = await pool.query(sql, [data]);
      console.log('results',results)
      return new Promise((res, rej) => {
        res(results);
      })
    } catch(err) {
      return new Promise((res, rej) => {
        rej(err);
      })
    }
  }
}

module.exports = Articles;
