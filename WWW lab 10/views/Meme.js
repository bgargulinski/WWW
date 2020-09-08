"use strict";
exports.__esModule = true;
exports.manager = exports.MemeManager = exports.Meme = void 0;
var Meme = /** @class */ (function () {
    function Meme(id, name, price, pastPrices, url) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.pastPrices = pastPrices;
        this.url = url;
    }
    Meme.prototype.change_price = function (cost) {
        if (this.pastPrices.length == 0)
            this.pastPrices = [this.price];
        else
            this.pastPrices.push(this.price);
        this.price = Number(cost);
    };
    return Meme;
}());
exports.Meme = Meme;
var MemeManager = /** @class */ (function () {
    function MemeManager(memes) {
        var _this = this;
        this.getThreeBest = function () {
            var memes_sorted = _this.memes.sort(function (m1, m2) { return (m1.price > m2.price ? -1 : 1); });
            return memes_sorted.slice(0, 3);
        };
        this.memes = memes;
    }
    MemeManager.prototype.getById = function (id) {
        for (var _i = 0, _a = this.memes; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.id == id) {
                return m;
            }
        }
        return null;
    };
    return MemeManager;
}());
exports.MemeManager = MemeManager;
var m1 = new Meme(10, 'Gold', 1000, [123, 431], 'https://i.redd.it/h7rplf9jt8y21.png');
var m2 = new Meme(9, 'Platinum', 1100, [321, 341], 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg');
var m3 = new Meme(8, 'Elite', 1200, [431, 123], 'https://i.imgflip.com/30zz5g.jpg');
exports.manager = new MemeManager([m1, m2, m3]);
