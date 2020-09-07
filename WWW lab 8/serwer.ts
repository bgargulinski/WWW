import {createServer} from 'http';
import * as fs from 'fs';
import {promisify} from 'util';
const sqlite3 = require('sqlite3').verbose();


function wpiszDane(lok, numer) {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza.db');

    db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES ("' + lok + '", ' + numer + ');');

    db.close();
}

function read(lok): number{
    sqlite3.verbose();

    let db = new sqlite3.Database('baza.db');
    let sqlString = 'SELECT sciezka, liczba FROM wyswietlenia WHERE sciezka = \''
        + lok + '\';'

    let result = -1
    db.all(sqlString, [], (err, rows) => {

        if(rows.length > 0) {
            if (err) throw(err);
            for (let {sciezka, liczba} of rows) {
                result = liczba;
            }
        }
        else{
            wpiszDane(lok, 0);
        }
        db.close();
    });
    return result
}

let server = createServer(
    async (req, res) => {

        let db = new sqlite3.Database('baza.db');
        db.myQuery = function (sql, params) {
            var that = this;
            return new Promise(function (resolve, reject) {
                that.all(sql, params, function (error, rows) {
                    if (error)
                        reject(error);
                    else
                        resolve(rows);
                });
            });
        };


        let urlString = req.url

        let open = promisify(fs.open);
        let close = promisify(fs.close);
        let fd;

        urlString = urlString.slice(1);
        let buffer

        try {
            if (fs.existsSync(urlString)) {
                open(urlString, 'r').then((_fd) => {
                    fd = _fd;
                    fs.readFile(urlString, function (err, data) {
                        if (err) throw err;
                        buffer = data.toString('utf-8');

                        const rows = await


                        res.write(buffer);
                        res.end();
                    });
                }).then(() => close(fd)).catch((reason) => {
                    console.log('Błąd był straszliwy!', reason);
                });
            }
            else if(urlString == 'statystyki'){

                res.write('statystyki');
                res.end();
            }
            else {

            }
        } catch(err) {
            console.error(err)
        }
    }
);

server.listen(8080);