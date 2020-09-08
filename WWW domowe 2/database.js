const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');

class Zadanie {
    tresc;
    odpowiedzA;
    odpowiedzB;
    odpowiedzC;
    odpowiedzD;
    prawidlowa;
    karaZaZla;
    czyRozwiazane;
    czasPoswiecony;

    constructor(tresc, odpowiedzA, odpowiedzB, odpowiedzC,
                odpowiedzD, prawidlowa, karaZaZla) {
        this.tresc = tresc;
        this.odpowiedzA = odpowiedzA;
        this.odpowiedzB = odpowiedzB;
        this.odpowiedzC = odpowiedzC;
        this.odpowiedzD = odpowiedzD;
        this.prawidlowa = prawidlowa;
        this.karaZaZla = karaZaZla;
        this.czyRozwiazane = false;
        this.czasPoswiecony = 0;
    }

    rozwiaz() {
        this.czyRozwiazane = true;
    }
}

class Quiz {
    zadania;
    obecnyCzas;
    obecneZadanie;
    liczbaRozwiazanych;
    czyRozwiazny;
    wstep;
    tytul;
    ID;

    constructor(zadania, tytul, wstep, ID) {
        this.zadania = zadania;
        this.obecneZadanie = 1;
        this.obecnyCzas = 0;
        this.czyRozwiazny = false;
        this.liczbaRozwiazanych = 0;
        this.wstep = wstep;
        this.tytul = tytul;
        this.ID = ID;
    }
}

const myQuery = function (db, sql, params) {
    return new Promise(function (resolve, reject) {
        db.all(sql, params, function (error, rows) {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
    });
};

const myRun = function (db, sql) {
    return new Promise(function (resolve, reject) {
        db.run(sql, function (error) {
            if (error)
                reject(error);
            else
                resolve();
        });
    });
};

let init = () => {
    db.serialize(() => {
        myRun(db, 'CREATE TABLE IF NOT EXISTS users(login VARCHAR(20) PRIMARY KEY, password VARCHAR(20))')
        myRun(db, 'CREATE TABLE IF NOT EXISTS quizy(id NUMBER PRIMARY KEY, title VARCHAR(20), intro VARCHAR(100))')
        myRun(db, 'CREATE TABLE IF NOT EXISTS questions(idQuiz NUMBER, content VARCHAR(60), a VARCHAR(20),' +
            'b VARCHAR(20), c VARCHAR(20), d VARCHAR(20), correct VARCHAR(20), penalty VARCHAR(20))')
        myRun(db, 'CREATE TABLE IF NOT EXISTS results(idQuiz NUMBER, login VARCHAR(20), content VARCHAR(60),' +
            'response VARCHAR(20), seconds NUMBER, penalty NUMBER, good BOOLEAN)')
        myRun(db, 'CREATE TABLE IF NOT EXISTS full(idQuiz NUMBER, login VARCHAR(20), result NUMBER)')
        myRun(db, 'INSERT INTO users VALUES("user1", "user1")')
        myRun(db, 'INSERT INTO users VALUES("user2", "user2")')
        loadQuizy()
    })
}

let zadanko1 = new Zadanie("2 + 2 =", "4", "5", "2", "1", 4, 2);
let zadanko2 = new Zadanie("5 * 8 =", "25", "40", "33", "2", 40, 3);
let zadanko3 = new Zadanie("5 ^ 3=", "125", "40", "33", "20", 125, 5);
let zadanko4 = new Zadanie("5 - 3=", "0", "40", "33", "2", 2, 2);
let quizie = new Quiz([zadanko1, zadanko2, zadanko3, zadanko4], "Fantastyczny quiz", "Witamy w fantastycznym quizie!!!", 1000);
let quizy = [quizie]

let loadQuizy = async () => {
    for(const quiz of quizy) {
        console.log(quiz.tytul)
        await myRun(db, 'INSERT INTO quizy VALUES(1000, "'+quiz.tytul+'", "'+quiz.wstep+'")')
        for(const x of quiz.zadania)
            await myRun(db, 'INSERT INTO questions VALUES('+quiz.ID+', "'+x.tresc+'", "'+x.odpowiedzA+'", "'+x.odpowiedzB+'",' +
                '"'+x.odpowiedzC+'", "'+x.odpowiedzD+'", "'+x.prawidlowa+'", '+x.karaZaZla+')')
    }
}

init()