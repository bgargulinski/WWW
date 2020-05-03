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
    function Quiz(zadania, wstep) {
        this.zadania = zadania;
        this.obecneZadanie = 1;
        this.obecnyCzas = 0;
        this.czyRozwiazny = false;
        this.liczbaRozwiazanych = 0;
        this.wstep = wstep;
    }
    return Quiz;
}());
function Zapisz(quiz, punkty) {
    var wyniki;
    var osoba = prompt("Podaj swoje imię", "Twoje imię");
    if (localStorage.getItem("wyniki") == null) {
        wyniki = [[punkty, osoba, quiz]];
    }
    else {
        wyniki = JSON.parse(localStorage.getItem("wyniki"));
        wyniki.push([punkty, osoba, quiz]);
    }
    wyniki.sort(function (n1, n2) { return n1[0] - n2[0]; });
    localStorage.setItem("wyniki", JSON.stringify(wyniki));
    window.location.href = './main.html';
}
function Odrzuc() {
    window.location.href = './main.html';
}
var quiz = JSON.parse(localStorage.getItem("currentQuiz"));
var tabelka = document.getElementById("cialo");
var wynik = quiz.obecnyCzas / 1000;
for (var i = 0; i < quiz.zadania.length; i++) {
    var row = tabelka.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = String(i + 1);
    if (quiz.zadania[i].czyPoprawnie) {
        cell2.textContent = "OK";
        cell2.style.backgroundColor = "green";
        cell4.textContent = "BRAK";
        cell4.style.backgroundColor = "green";
    }
    else {
        cell2.textContent = "ŹLE";
        cell2.style.backgroundColor = "red";
        cell4.textContent = String(quiz.zadania[i].karaZaZla / 1000) + "s";
        cell4.style.backgroundColor = "red";
        wynik += (quiz.zadania[i].karaZaZla / 1000);
    }
    cell3.textContent = String(quiz.zadania[i].czasPoswiecony / 1000) + "s";
}
document.getElementById("czas").textContent = String(quiz.obecnyCzas / 1000);
document.getElementById("punkty").textContent = String(wynik);
