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
      res.send(err)
      next(err);
    }
    console.log('data',data)
    res.send(data);
  })
});

router.get('/', async (req, res, next) => {
  if (req.query.id) {
    try {
      const response = Users.find(req.query.id);
      res.send(response)
    } catch(err) {
      next(err);
      res.send(err);
    }
  }
});


router.post('/', (req, res, next) => {
  if (req.body.name && req.body.email) {
    Users.create(req.body, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send(data);
    })
  } else {
    res.status(500);
    res.send()
  }
})

router.put('/', (req, res, next) => {
  if (req.query.id) {
    Users.update({...req.body, id: req.query.id}, (err, data) => {
      if (err) {
        next(err)
        return;
      }
      res.send(data);
    })
  }
})

router.delete('/', (req, res, next) => {
  if (req.query.id) {
    Users.delete(req.query.id, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.send(data);
    })
  }
})

module.exports = router;
