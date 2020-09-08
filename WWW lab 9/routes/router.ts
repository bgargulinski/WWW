let express = require('express');
const m = require('../views/Meme');
import { manager, Meme } from '../views/Meme.js';

export var router = express.Router();

router.use(express.urlencoded({

    extended: true
  
  }));

router.get('/', function(req, res) {
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: manager.getThreeBest() })
  });

router.get('/meme/:id', function (req, res) {
    let id = req.params.id;
    let meme:Meme = manager.getById(id);

    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    } else {
        res.render('meme', { meme: meme });
    }
});

router.post('/meme/:id', function (req, res) {
  let id = req.params.id;
  let meme:Meme = manager.getById(id);

  if (meme == null) {
      res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
  } else {
      meme.change_price(req.body.price)
      console.log(req.body.price);
      res.render('meme', { meme: meme });
  }
  
});
