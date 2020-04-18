const express = require('express');
const router = express.Router();

const Tracks = require('../models/Tracks');

router.get('/', (req, res, next) => {
  if (req.query.id) {
    next();
    return;
  }
  Tracks.all((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send(data);
  })
})
router.get('/', (req, res, next) => {
  if (req.query.id) {
    Tracks.find(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send(data || { data: null });
    });
  }
});

router.post('/', (req, res, next) => {
  Tracks.create(req.body, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send('Ok');
  })
});

router.delete('/', (req, res, next) => {
  if (req.query.id) {
    Tracks.delete(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send('Deleted success');
    });
  }

})


module.exports = router;
