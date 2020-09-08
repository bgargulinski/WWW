// @ts-ignore
class StatyQuizu {
    ID: number;
    wynik: number;
    czas: number;
    zadania: ZadanieDoStat[];

    constructor(ID: number, wynik: number, czas: number, zadania: ZadanieDoStat[]){
        this.ID = ID;
        this.wynik = wynik;
        this.czas = czas;
        this.zadania = zadania;
    }
}

var tabelka1 = <HTMLTableSectionElement> document.getElementById("cialo");
var tabelka2 = <HTMLTableSectionElement> document.getElementById("poprawne");
var tabelka3 = <HTMLTableSectionElement> document.getElementById("moje");
var tabelka4 = <HTMLTableSectionElement> document.getElementById("srednia");

// @ts-ignore
let quiz
let wyniki
let poprawne
let moje
let avg

// @ts-ignore
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(e) {
    if (xhttp.readyState !== 4 || xhttp.status !== 200)
        return
    wyniki = xhttp.response.results
    poprawne = xhttp.response.correct
    moje = xhttp.response.mine
    avg = xhttp.response.avg
    init()
};

xhttp.open("POST", location.href, true);
xhttp.responseType = "json"
xhttp.send();

const init = () => {
    for (let i = 0; i < 10 && i < wyniki.length; i++){
        let row = <HTMLTableRowElement> tabelka1.insertRow(i);
        let cell1 = <HTMLTableCellElement> row.insertCell(0);
        let cell2 = <HTMLTableCellElement> row.insertCell(1);

        cell1.textContent = wyniki[i].login;
        cell2.textContent = String(wyniki[i].result);
    }

    for (let i = 0; i < 10 && i < poprawne.length; i++){
        let row = <HTMLTableRowElement> tabelka2.insertRow(i);
        let cell1 = <HTMLTableCellElement> row.insertCell(0);
        let cell2 = <HTMLTableCellElement> row.insertCell(1);

        cell1.textContent = poprawne[i].content;
        cell2.textContent = poprawne[i].correct;
    }

    for (let i = 0; i < 10 && i < moje.length; i++){
        let row = <HTMLTableRowElement> tabelka3.insertRow(i);
        let cell1 = <HTMLTableCellElement> row.insertCell(0);
        let cell2 = <HTMLTableCellElement> row.insertCell(1);
        let cell3 = <HTMLTableCellElement> row.insertCell(2);
        let cell4 = <HTMLTableCellElement> row.insertCell(3);
        let cell5 = <HTMLTableCellElement> row.insertCell(4);

        cell1.textContent = moje[i].content;
        cell2.textContent = moje[i].response;
        cell3.textContent = moje[i].penalty;
        cell4.textContent = moje[i].seconds;
        cell5.textContent = moje[i].good;
    }

    for (let i = 0; i < 10 && i < avg.length; i++){
        let row = <HTMLTableRowElement> tabelka4.insertRow(i);
        let cell1 = <HTMLTableCellElement> row.insertCell(0);
        let cell2 = <HTMLTableCellElement> row.insertCell(1);

        cell1.textContent = avg[i].content;
        cell2.textContent = avg[i].avg;
    }
}