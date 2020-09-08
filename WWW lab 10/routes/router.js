"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require('express');
var m = require('../views/Meme');
var Meme_js_1 = require("../views/Meme.js");
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
exports.router = express.Router();
exports.router.use(express.urlencoded({
    extended: true
}));
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
exports.router.use(cookieParser());
exports.router.use(bodyParser.json());
exports.router.use(csrf({ cookie: true }));
exports.router.get('/', csrfProtection, function (req, res) {
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: Meme_js_1.manager.getThreeBest(),
        csrfToken: req.csrfToken() });
});
exports.router.get('/meme/:id', csrfProtection, function (req, res) {
    var id = req.params.id;
    var meme = Meme_js_1.manager.getById(id);
    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else {
        res.render('meme', { meme: meme, csrfToken: req.csrfToken() });
    }
});
exports.router.post('/meme/:id', parseForm, csrfProtection, function (req, res) {
    var id = req.params.id;
    var meme = Meme_js_1.manager.getById(id);
    if (meme == null) {
        res.status(404).send('Mem o ID ' + id + ' nie istnieje.');
    }
    else {
        meme.change_price(req.body.price);
        console.log(req.body.price);
        res.render('meme', { meme: meme });
    }
});
