var sqlite3 = require('sqlite3').verbose();
var makeDb = function makeDb() {
    var db = new sqlite3.Database('memki.db');
    db.run("CREATE TABLE IF NOT EXISTS previousPrices (\n        id INTEGER, \n        price INTEGER\n    );");
    db.run("CREATE TABLE IF NOT EXISTS meme (\n        id INTEGER, \n        name VARCHAR(255), \n        price INTEGER, \n        url VARCHAR(700)\n    );");
    db.run("CREATE TABLE IF NOT EXISTS user (\n        login TEXT NOT NULL UNIQUE,\n        password TEXT NOT NULL\n    );");
    db.run("CREATE TABLE IF NOT EXISTS priceChanges (\n        id INTEGER,\n        login TEXT,\n        price INTEGER\n    );");
    db.close();
};
var initDb = function initDb() {
    var db = new sqlite3.Database('memki.db');
    db.run('INSERT INTO meme (id, name, price, url) VALUES ' +
        '(8, "ELITE", 1200, "https://i.imgflip.com/30zz5g.jpg"),' +
        '(9, "PLATINUM", 1100, "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg"), ' +
        '(10, "GOLD", 1000, "https://i.redd.it/h7rplf9jt8y21.png"); ');
    db.run('INSERT INTO previousPrices (id, price) VALUES (8, 676), (8, 2412),' +
        '(10, 124), (10, 535), (9, 531), (9, 341);');
    db.close();
};
function init(callback) {
    makeDb();
}
init(function () {
    initDb();
});
