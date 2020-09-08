var express = require('express');
var r = require('./router');
var myRouter = r.router;
// import {myRouter} from './router.js';
var app = express();
app.set('view engine', 'pug');
app.use('/', myRouter);
app.listen(8080, function () {
    console.log('aplikacja na porcie 8080');
});
