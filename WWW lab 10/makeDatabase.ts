const sqlite3 = require('sqlite3').verbose();

const makeDb = function makeDb() {
    let db = new sqlite3.Database('memki.db');

    db.run(`CREATE TABLE IF NOT EXISTS previousPrices (
        id INTEGER, 
        price INTEGER
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS meme (
        id INTEGER, 
        name VARCHAR(255), 
        price INTEGER, 
        url VARCHAR(700)
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS user (
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS priceChanges (
        id INTEGER,
        login TEXT,
        price INTEGER
    );`);

    db.close();
}

const initDb = function initDb() {
    let db = new sqlite3.Database('memki.db');

    db.run('INSERT INTO meme (id, name, price, url) VALUES ' +
        '(8, "ELITE", 1200, "https://i.imgflip.com/30zz5g.jpg"),' +
        '(9, "PLATINUM", 1100, "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg"), ' +
        '(10, "GOLD", 1000, "https://i.redd.it/h7rplf9jt8y21.png"); ');

    db.run('INSERT INTO previousPrices (id, price) VALUES (8, 676), (8, 2412),' +
        '(10, 124), (10, 535), (9, 531), (9, 341);');

    db.close();
}

const insertUser = function initDb(){
    let db = new sqlite3.Database('memki.db');

    db.run('INSERT INTO user (login, password) VALUES ' +
        '("user_1", "password_1"), ("user_2", "password_2");');

    db.close();
}

function init(callback){
    makeDb();
}

init(()=>{
    initDb();
});

insertUser();