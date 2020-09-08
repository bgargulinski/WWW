// @ts-ignore
var StatyQuizu = /** @class */ (function () {
    function StatyQuizu(ID, wynik, czas, zadania) {
        this.ID = ID;
        this.wynik = wynik;
        this.czas = czas;
        this.zadania = zadania;
    }
    return StatyQuizu;
}());
var tabelka1 = document.getElementById("cialo");
var tabelka2 = document.getElementById("poprawne");
var tabelka3 = document.getElementById("moje");
var tabelka4 = document.getElementById("srednia");
// @ts-ignore
var quiz;
var wyniki;
var poprawne;
var moje;
var avg;
// @ts-ignore
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (e) {
    if (xhttp.readyState !== 4 || xhttp.status !== 200)
        return;
    wyniki = xhttp.response.results;
    poprawne = xhttp.response.correct;
    moje = xhttp.response.mine;
    avg = xhttp.response.avg;
    init();
};
xhttp.open("POST", location.href, true);
xhttp.responseType = "json";
xhttp.send();
var init = function () {
    for (var i = 0; i < 10 && i < wyniki.length; i++) {
        var row = tabelka1.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = wyniki[i].login;
        cell2.textContent = String(wyniki[i].result);
    }
    for (var i = 0; i < 10 && i < poprawne.length; i++) {
        var row = tabelka2.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = poprawne[i].content;
        cell2.textContent = poprawne[i].correct;
    }
    for (var i = 0; i < 10 && i < moje.length; i++) {
        var row = tabelka3.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.textContent = moje[i].content;
        cell2.textContent = moje[i].response;
        cell3.textContent = moje[i].penalty;
        cell4.textContent = moje[i].seconds;
        cell5.textContent = moje[i].good;
    }
    for (var i = 0; i < 10 && i < avg.length; i++) {
        var row = tabelka4.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = avg[i].content;
        cell2.textContent = avg[i].avg;
    }
};
