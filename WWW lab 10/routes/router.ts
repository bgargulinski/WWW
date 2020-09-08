let express = require('express');
const m = require('../views/Meme');

export var router = express.Router();

router.use(express.urlencoded({

    extended: true
  
}));

