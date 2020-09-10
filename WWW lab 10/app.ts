const sqlite3 = require('sqlite3').verbose();
import {MemeManager, Meme} from "./views/Meme";
const express = require('express');
//import {router} from './routes/router.js';
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const app = express();
const parseForm = bodyParser.urlencoded({ extended: false })
var db = new sqlite3.Database('memki.db');
const dbStore = require('connect-sqlite3')(session);


app.set('trust proxy', 1);
app.use(cookieParser());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use('/', router);
app.use(session({
    store: new dbStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 15}
}));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));


let loggedLogin;
let loggedIn =  false;
let csrfProtection = csrf({});



db.myQuery = function (req, parameters) {
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

db.myRun = function (req) {
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
    let row = await db.myQuery('SELECT * FROM meme WHERE id = ' + id, []);
    let priceRows = await db.myQuery('SELECT * FROM previousPrices WHERE id = ' + id, []);

    let memePriceTable = [];

    priceRows.forEach((priceRow)=>{
        memePriceTable.push(priceRow.price);
    });

    return new Meme(row[0].id, row[0].name, row[0].price, memePriceTable ,row[0].url);
}

async function addPrice(id, price){
    let run = await db.myRun('INSERT INTO previousPrices (id, price) VALUES (' + id + ', ' + price+ ');');
}

async function getUser(login){
    return await db.myQuery('SELECT * FROM user WHERE login = "' + login + '"', []);
}

async function savePriceChanger(id, login, price){
    let run = await db.myRun('INSERT INTO priceChanges (id, login, price) VALUES ('
        + id + ', "' + login + '",' + price+ ');');
}

async function makeManager(){
    let meme1 = await getMeme(8);
    let meme2 = await getMeme(9);
    let meme3 = await getMeme(10);

    return new MemeManager([meme1,meme2,meme3]);
}

app.get('/', async function(req, res) {
    console.log(req.session);
    let manager = await makeManager();
    if (req.session.views)
        await (req.session.views++);
    else
        await (req.session.views = 1);

    res.render('index', { title: 'Meme market', message: 'Hello there!',
        viewed: req.session.views, memes: manager.getThreeBest()});
});

app.get('/meme/:id', csrfProtection, async function (req, res) {
    let manager = await makeManager();
    let id = req.params.id;
    let meme:Meme = manager.getById(id);

    if (req.session.views == undefined)
        req.session.views = 1;
    else
        req.session.views++;

    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else
        res.render('meme', { meme: meme, csrfToken: req.csrfToken(), viewed: req.session.views,
            logStatus: loggedIn });
});

app.post('/meme/:id', parseForm, csrfProtection,
    async function (req, res) {
        let manager = await makeManager();
        let id = req.params.id;
        let meme:Meme = manager.getById(id);

        if (meme == null) {
            res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
       }
        else {
            await addPrice(id, req.body.price);
            await savePriceChanger(id, req.session.user, req.body.price);
            meme.change_price(req.body.price);
            console.log(req.body.price);
            res.render('meme', { meme: meme, csrfToken: req.csrfToken(), viewed: req.session.views,
                logStatus: loggedIn});
       }
});

app.get('/login', csrfProtection, function (req, res) {
    if (!req.session.user){
        if (req.session.views == undefined)
            req.session.views = 1;
        else
            req.session.views++;

        res.render('login', {warning: false, csrftoken: req.csrfToken(), viewed: req.session.views});
    }
    else
        res.redirect('/');
});

app.post('/login', csrfProtection, async function(req,res){
    if(!req.session.user){
        let user = await getUser(req.body.login);
        console.log(user);
        if (req.body.password == user[0].password){
            loggedIn = true;
            req.session.user = req.body.login;
            loggedLogin = req.body.login;
            res.redirect('/login');
        }
        else
            res.render('login fail', {warning: true, csrftoken: req.csrfToken(), viewed: req.session.views});
    }
    else
        res.status(405).send();
});

app.post('/logout', function (req, res){
    loggedIn = false
    req.session.user = undefined;
    res.redirect('/');
});

app.listen(8080, async function(){
    console.log('port 8080');
});
