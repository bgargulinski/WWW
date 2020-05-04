var Zadanie = /** @class */ (function () {
    function Zadanie(tresc, odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD, prawidlowa, karaZaZla) {
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
    Zadanie.prototype.rozwiaz = function () {
        this.czyRozwiazane = true;
    };
    return Zadanie;
}());
var Quiz = /** @class */ (function () {
    function Quiz(zadania, wstep, ID) {
        this.zadania = zadania;
        this.obecneZadanie = 1;
        this.obecnyCzas = 0;
        this.czyRozwiazny = false;
        this.liczbaRozwiazanych = 0;
        this.wstep = wstep;
        this.ID = ID;
    }
    return Quiz;
}());
var ZadanieDoStat = /** @class */ (function () {
    function ZadanieDoStat(numerZad, CzyPrawidlowa, kara, czasNaZadanie) {
        this.numerZad = numerZad;
        this.CzyPrawidlowa = CzyPrawidlowa;
        this.kara = kara;
        this.czasNaZadanie = czasNaZadanie;
    }
    return ZadanieDoStat;
}());
var StatyQuizu = /** @class */ (function () {
    function StatyQuizu(ID, wynik, czas, zadania) {
        this.ID = ID;
        this.wynik = wynik;
        this.czas = czas;
        this.zadania = zadania;
    }
    return StatyQuizu;
}());
function wroc() {
    window.location.href = './main.html';
}
var wyniki = JSON.parse(localStorage.getItem("wyniki"));
var tabelka = document.getElementById("cialo");
for (var i = 0; i < 10 && i < wyniki.length; i++) {
    var row = tabelka.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell2.textContent = String(wyniki[i][0]);
    cell1.textContent = wyniki[i][1];
}
