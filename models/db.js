const { Pool } = require('pg');

const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'awesome',
  password: 'password',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool;
