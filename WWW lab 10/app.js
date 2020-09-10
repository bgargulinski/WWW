"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sqlite3 = require('sqlite3').verbose();
var Meme_1 = require("./views/Meme");
var express = require('express');
var router_js_1 = require("./routes/router.js");
var path = require('path');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var app = express();
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
var md5 = require('md5');
var db = new sqlite3.Database('memki.db');
db.querying = function (req, parameters) {
    var _this = this;
    var myPromise = new Promise(function (res, rej) {
        _this.all(req, parameters, function (err, rows) {
            if (err) {
                rej(err);
            }
            else {
                res(rows);
            }
        });
    });
    return myPromise;
};
db.running = function (req) {
    var _this = this;
    var myPromise = new Promise(function (res, rej) {
        _this.run(req, function (err, rows) {
            if (err)
                rej(err);
            else
                res();
        });
    });
    return myPromise;
};
function getMeme(id) {
    return __awaiter(this, void 0, void 0, function () {
        var row, priceRows, memePriceTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.querrying('SELECT * FROM meme WHERE id = ' + id, [])];
                case 1:
                    row = _a.sent();
                    return [4 /*yield*/, db.querrying('SELECT * FROM previousPrices WHERE id = ' + id, [])];
                case 2:
                    priceRows = _a.sent();
                    memePriceTable = [];
                    priceRows.forEach(function (priceRow) {
                        memePriceTable.push(priceRow.price);
                    });
                    return [2 /*return*/, new Meme_1.Meme(row[0].id, row[0].name, row[0].price, memePriceTable, row[0].url)];
            }
        });
    });
}
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(csrf({ cookie: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', router_js_1.router);
app.use(session({
    secret: 'totally secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
var loggedIn = false;
app.get('/', function (req, res) {
    req.session.views = (req.session.views) + 1;
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: Meme_1.manager.getThreeBest() });
});
app.get('/meme/:id', csrfProtection, function (req, res) {
    var id = req.params.id;
    var meme = Meme_1.manager.getById(id);
    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else {
        res.render('meme', { meme: meme, csrfToken: req.csrfToken() });
    }
});
app.get('/login', csrfProtection, function (req, res) {
    if (req.session.user)
        res.redirect('/');
    else {
        req.session.views = (req.session.views) + 1;
        res.render('login', { warning: false, csrfToken: req.csrfToken() });
    }
});
app.post('/meme/:id', parseForm, csrfProtection, function (req, res) {
    var id = req.params.id;
    var meme = Meme_1.manager.getById(id);
    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else {
        meme.change_price(req.body.price);
        console.log(req.body.price);
        res.render('meme', { meme: meme });
    }
});
app.listen(8080, function () {
    console.log('aplikacja na porcie 8080');
    console.log(getMeme(8));
});
