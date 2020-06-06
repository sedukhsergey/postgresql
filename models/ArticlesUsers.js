const pool = require('./db');

class ArticlesUsers {
  static find(id, cb) {
    const sql = 'SELECT * FROM articles_users WHERE id = $1';
    pool.query(sql, [id], (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, results.rows);
    })
  }

  static all(cb) {
    const sql = 'SELECT * FROM articles_users';
    pool.query(sql, (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, results.rows);
    })
  }

  static async create(data) {
    const sql = 'INSERT INTO articles_users(articleId, authorId) VALUES($1, $2) RETURNING id';
    try {
      const response = pool.query(sql, [data.articleId, data.authorId]);
      return new Promise((res, rej) => res(response))
    } catch(err) {
      return new Promise((res, rej) => rej(err))
    }
  }

  static update(data, cb) {
    const sql = 'UPDATE articles_users SET articleId = $1, authorId = $2, WHERE id = $3';
    pool.query(sql, [data.articleId, data.authorId, data.id], (err, results) => {
      if (err) {
        return cb(err)
      }
      return cb(null, results.rows)
    })
  }

  static delete(data, cb) {
    const sql = 'DELETE FROM articles_users WHERE id = $1';
    pool.query(sql, [data], (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, data)
    })
  }
}

module.exports = ArticlesUsers;
