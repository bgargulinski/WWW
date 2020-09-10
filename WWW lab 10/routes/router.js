"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require('express');
var m = require('../views/Meme');
exports.router = express.Router();
exports.router.use(express.urlencoded({
    extended: true
}));
