const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', (req, res, next) => {
  if (req.query.id) {
    next();
    return;
  }
  Article.all((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send(data);
  });
});

router.get('/', (req, res, next) => {
  if (req.query.id) {
    Article.find(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send(data || { data: null });
    });
  }
});

router.post('/', (req, res, next) => {
  Article.create(req.body, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send('Ok');
  });
});

router.delete('/', (req, res, next) => {
  if (req.query.id) {
    Article.delete(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send('Success');
    });
  }
});




module.exports = router;
