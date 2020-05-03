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
function tick(quiz) {
    quiz.obecnyCzas += 1000;
    quiz.zadania[quiz.obecneZadanie - 1].czasPoswiecony += 1000;
    document.getElementById("czas").textContent = String(quiz.obecnyCzas / 1000);
}
function start(quiz) {
    setInterval(function () { tick(quiz); }, 1000);
}
function zaladuj(quiz) {
    document.getElementById("indeks").textContent = String(quiz.obecneZadanie) + "/" + String(quiz.zadania.length);
    document.getElementById("kara").textContent = String(quiz.zadania[quiz.obecneZadanie - 1].karaZaZla / 1000);
    document.getElementById("tresc").textContent = quiz.zadania[quiz.obecneZadanie - 1].tresc;
    document.getElementById("odp1").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzA;
    document.getElementById("odp2").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzB;
    document.getElementById("odp3").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzC;
    document.getElementById("odp4").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzD;
}
function next(quiz) {
    if (quiz.obecneZadanie < quiz.zadania.length) {
        quiz.obecneZadanie++;
        zaladuj(quiz);
    }
}
function back(quiz) {
    if (quiz.obecneZadanie > 0) {
        quiz.obecneZadanie--;
        zaladuj(quiz);
    }
}
function odpowiedz(quiz, id) {
    if (id != quiz.zadania[quiz.obecneZadanie - 1].prawidlowa) {
        quiz.zadania[quiz.obecneZadanie - 1].czyPoprawnie = false;
        //quiz.obecnyCzas += quiz.zadania[quiz.obecneZadanie - 1].karaZaZla;
        //document.getElementById("czas").textContent = String(quiz.obecnyCzas / 1000);
    }
    else
        quiz.zadania[quiz.obecneZadanie - 1].czyPoprawnie = true;
    if (!quiz.zadania[quiz.obecneZadanie - 1].czyRozwiazane) {
        quiz.zadania[quiz.obecneZadanie - 1].rozwiaz;
        quiz.liczbaRozwiazanych++;
    }
    if (quiz.liczbaRozwiazanych == quiz.zadania.length) {
        quiz.czyRozwiazny = true;
    }
    next(quiz);
    if (quiz.liczbaRozwiazanych == quiz.zadania.length) {
        document.getElementById("stop").style.backgroundColor = "blueviolet";
    }
}
function stopQuiz(quiz) {
    if (quiz.czyRozwiazny) {
        localStorage.setItem("currentQuiz", JSON.stringify(quizik));
        window.location.href = './podsumowanie.html';
    }
}
function czysc() {
    document.getElementById("tresc").textContent = "";
    document.getElementById("odp1").textContent = "";
    document.getElementById("odp2").textContent = "";
    document.getElementById("odp3").textContent = "";
    document.getElementById("odp4").textContent = "";
}
function czytajWstep(quiz) {
    czysc();
    window.confirm(quiz.wstep);
    zaladuj(quiz);
}
function Anuluj() {
    if (window.confirm("Czy napewno chcesz anulować quiz?")) {
        localStorage.removeItem("currentQuiz");
        window.location.href = './main.html';
    }
}
/*
Format quizu

let zadanko1 = new Zadanie("2 + 2 =", "4", "5", "2", "1", 1, 2000);
let zadanko2 = new Zadanie("5 * 8 =", "25", "40", "33", "2", 2, 3000);
let zadanko3 = new Zadanie("5 ^ 3=", "125", "40", "33", "20", 1, 5000);
let zadanko4 = new Zadanie("5 - 3=", "0", "40", "33", "2", 4, 2000);
let quizik = new Quiz([zadanko1, zadanko2, zadanko3, zadanko4], "Witamy w fantastycznym quizie!!!");*/
//format JSONowy
var quizik = JSON.parse('{"zadania":[{"tresc":"2 + 2 =","odpowiedzA":"4","odpowiedzB":"5","odpowiedzC":"2","odpowiedzD":"1","prawidlowa":1,"karaZaZla":2000,"czyRozwiazane":false,"czasPoswiecony":0},{"tresc":"5 * 8 =","odpowiedzA":"25","odpowiedzB":"40","odpowiedzC":"33","odpowiedzD":"2","prawidlowa":2,"karaZaZla":3000,"czyRozwiazane":false,"czasPoswiecony":0},{"tresc":"5 ^ 3=","odpowiedzA":"125","odpowiedzB":"40","odpowiedzC":"33","odpowiedzD":"20","prawidlowa":1,"karaZaZla":5000,"czyRozwiazane":false,"czasPoswiecony":0},{"tresc":"5 - 3=","odpowiedzA":"0","odpowiedzB":"40","odpowiedzC":"33","odpowiedzD":"2","prawidlowa":4,"karaZaZla":2000,"czyRozwiazane":false,"czasPoswiecony":0}],"obecneZadanie":1,"obecnyCzas":0,"czyRozwiazny":false,"liczbaRozwiazanych":0,"wstep":"Witamy w fantastycznym quizie!!!"}');
localStorage.removeItem("currentQuiz");
czysc();
window.confirm(quizik.wstep);
zaladuj(quizik);
start(quizik);
