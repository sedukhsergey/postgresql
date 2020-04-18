const db = require('./db');

class Users {
  static all(cb) {
    db.all('SELECT * FROM users', cb);
  }
  static create(data, cb) {
    const sql = 'INSERT INTO users(name, city) VALUES (?, ?)';
    db.run(sql, data.name, data.city, cb);
  }

  static put(data, cb) {
    const sql = `
      UPDATE users
      SET name = ?, city = ?
      WHERE id = ?
    `;
    db.run(sql, data.name, data.city, data.id, cb);
  }

  static find(id, cb) {
    db.get('SELECT * FROM users WHERE id = ?', id, cb)
  }

  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM users WHERE id = ?', id, cb);
  }
}

module.exports = Users;
