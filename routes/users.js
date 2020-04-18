const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query.id) {
    next();
    return;
  }
  Users.all((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send(data);
  })
});

router.get('/', (req, res, next) => {
  if (req.query.id) {
    Users.find(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send(data || { data: null });
    });
  }
});

router.put('/', (req, res, next) => {
  Users.put({...req.body, id: req.query.id}, (err, data) => {
    if (err) {
      next(err)
      return;
    }
    res.send('Success')
  })
})

router.post('/', (req, res, next) => {
  Users.create(req.body, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.send('Ok');
  })
});

router.delete('/', (req, res, next) => {
  if (req.query.id) {
    Users.delete(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send('Deleted success');
    });
  }

})

module.exports = router;
