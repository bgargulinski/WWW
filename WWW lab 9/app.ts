const express = require('express');
//let r = require('./router');
import {router} from './routes/router.js';
let path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', router);

app.listen(8080, function(){
   console.log('aplikacja na porcie 8080');
});
