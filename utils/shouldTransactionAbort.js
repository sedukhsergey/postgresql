const shouldAbort = (err, client) => {
  if (err) {
    console.error('Error in transaction', err.stack)
    client.query('ROLLBACK', err => {
      if (err) {
        console.error('Error rolling back client', err.stack)
      }
      // release the client back to the pool
      done()
    })
  }
  return !!err
}

module.exports = shouldAbort;
