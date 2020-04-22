const pool = require('./db');

class Users {
  static async find(id) {
    const sql = 'SELECT * FROM users WHERE id = $1';
    try {
    const response = await pool.query(sql, [id]);
      return new Promise((res, rej) => res(response.rows))
    }
    catch(err) {
        return new Promise((res, rej) => rej(err))
    }
  }

  static all(cb) {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, results.rows);
    })
  }

  static async create(data, cb) {
    const sql = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING id';
    pool.query(sql, [data.name, data.email], (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, results.rows);
    })
  }

  static update(data, cb) {
    const sql = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
    pool.query(sql, [data.name, data.email, data.id], (err, results) => {
      if (err) {
        return cb(err)
      }
      return cb(null, results.rows)
    })
  }

  static delete(data, cb) {
    const sql = 'DELETE FROM users WHERE id = $1';
    pool.query(sql, [data], (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, data)
    })
  }
}

module.exports = Users;
