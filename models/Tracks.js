const db = require('./db');

class Tracks {
  static all(cb) {
    db.run('SELECT * FROM tracks', cb)
  }

  static create(data, cb) {
    const sql = 'INSERT INTO tracks(composer, milliseconds) VALUES(?, ?)';
    db.run(sql, data.name, data.city, cb);
  }

  static find(id, cb) {
    db.get('SELECT * FROM tracks WHERE id = ?', id, cb)
  }

  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM tracks WHERE id = ?', id, cb);
  }
}

module.exports = Tracks;
