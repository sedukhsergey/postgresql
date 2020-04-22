const express = require('express');
const router = express.Router();
const Articles = require('../models/Articles');

/* GET users listing. */

router.get('/', async (req, res, next) => {
  if (req.query.id) {
    next();
    return;
  }
  try {
    const result = await Articles.all();
    res.send(result);
  } catch (err) {
    next(err);
    res.send(err)
  }
});

router.get('/', async (req, res, next) => {
  if (req.query.id) {
    try{
    const result = await Articles.find(req.query.id);
    res.send(result);
    }
    catch(err)  {
      next(err);
      res.send(err)
    }
  }
});

router.post('/', (req, res, next) => {
  if (req.body.name && req.body.authorId) {
    Articles.create(req.body, (err, id) => {
      if (err) {
        next(err);
        return;
      }
      res.send({id});
    })
  }
})

router.put('/', async (req, res, next) => {
  if (req.query.id) {
    try{
      const results = await Articles.update({...req.body, id: req.query.id});
      res.send('Success');
    } catch(err) {
      next(err);
      res.send(err);
    }
  }
})

router.delete('/', async (req, res, next) => {
  if (req.query.id) {
    try{
      const response = await Articles.delete(req.query.id);
      res.send('Deleting success')
    } catch(err) {
      next(err);
      res.send(err);
    }
  }
})

module.exports = router;
