const sqlite3 = require('sqlite3').verbose();
import {manager, Meme} from "./views/Meme";
const express = require('express');
import {router} from './routes/router.js';
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const app = express();
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })
const md5 = require('md5');
var db = new sqlite3.Database('db');

const makeDb = function makeDb() {
    let db = new sqlite3.Database('memki.db');

    db.run(`CREATE TABLE IF NOT EXISTS user (
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS priceChanges (
        id INTEGER,
        login TEXT,
        price INTEGER
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS previousPrices (
        id INTEGER, 
        price INTEGER
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS meme (
        id INTEGER, 
        name VARCHAR(255), 
        price INTEGER, 
        FOREIGN KEY(id) REFERENCES previousPrices(id)
        url VARCHAR(255), 
    );`);

    db.close();
}

const initDb = function initDb() {
    let db = new sqlite3.Database('memki.db');

    db.run('INSERT INTO previousPrices (id, price) VALUES , (8, 676), (8, 2412),' +
        '(10, 124), (10, 535), (9, 531), (9, 341)');

    db.run('INSERT INTO meme (id, name, price, url) VALUES ' +
        '(8, "ELITE", 1200, "https://i.imgflip.com/30zz5g.jpg");' +
        '(9, "PLATINUM", 1100, "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg"), ' +
        '(10, "GOLD", 1000, "https://i.redd.it/h7rplf9jt8y21.png"), ');
}

db.querying = function (req, parameters) {
    let myPromise = new Promise((res, rej)=>{
       this.all(req, parameters, (err,rows)=>{
          if(err){
              rej(err);
          }
          else{
              res(rows)
          }
       });
    });

    return myPromise;
}

db.running = function (req) {
    let myPromise = new Promise((res,rej)=>{
        this.run(req, (err,rows)=>{
           if (err)
               rej(err);
           else
               res();
        });
    });

    return myPromise;
}

async function getMeme(id){
    const row = await db.querrying('SELECT * FROM meme WHERE id = ' + id + ';');
    return new Meme(row[0].id, row[0].name, row[0].price, [], row[0].url);
}

async function getMemePrices(id){
    const
}

app.set('trust proxy', 1);
app.use(cookieParser())
app.use(bodyParser.json())
app.use(csrf({ cookie: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', router);
app.use(session({
    secret: 'totally secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 5},
}));
app.use(bodyParser.urlencoded({ extended: false }));

let loggedIn =  false;

app.get('/', function(req, res) {
    req.session.views = (req.session.views) + 1;
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: manager.getThreeBest()})
});

app.get('/meme/:id', csrfProtection, function (req, res) {
    let id = req.params.id;
    let meme:Meme = manager.getById(id);

    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else {
        res.render('meme', { meme: meme, csrfToken: req.csrfToken()  });
    }
});

app.get('/login', csrfProtection, function (req, res) {
    if (req.session.user)
        res.redirect('/');
    else {
        req.session.views = (req.session.views) + 1;
        res.render('login', {warning: false, csrfToken: req.csrfToken()});
    }
});


app.post('/meme/:id', parseForm, csrfProtection,
    function (req, res) {
        let id = req.params.id;
        let meme:Meme = manager.getById(id);

        if (meme == null) {
            res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
       }
        else {
            meme.change_price(req.body.price)
            console.log(req.body.price);
            res.render('meme', { meme: meme });
       }
});


app.listen(8080, function(){
    console.log('aplikacja na porcie 8080');
});
