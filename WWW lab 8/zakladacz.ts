import * as sqlite3 from 'sqlite3';


export function zalozBaze() {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza.db');

    db.run('CREATE TABLE wyswietlenia (sciezka VARCHAR(255), liczba INT);');

    db.close();

}

function wpiszDane(lok, numer) {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza.db');

    db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES ("' + lok + '", ' + numer + ');');

    db.close();

}

zalozBaze();

sqlite3.verbose();

