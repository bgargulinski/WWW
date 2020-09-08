// @ts-ignore
var Zadanie = /** @class */ (function () {
    function Zadanie(tresc, odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD, prawidlowa, karaZaZla) {
        this.tresc = tresc;
        this.odpowiedzA = odpowiedzA;
        this.odpowiedzB = odpowiedzB;
        this.odpowiedzC = odpowiedzC;
        this.odpowiedzD = odpowiedzD;
        this.karaZaZla = karaZaZla;
        this.czyRozwiazane = false;
        this.czasPoswiecony = 0;
    }
    Zadanie.prototype.rozwiaz = function () {
        this.czyRozwiazane = true;
    };
    return Zadanie;
}());
function tick() {
    quiz.obecnyCzas += 1000;
    quiz.zadania[quiz.obecneZadanie - 1].czasPoswiecony += 1000;
    document.getElementById("czas").textContent = String(quiz.obecnyCzas / 1000);
}
function start() {
    setInterval(function () { tick(); }, 1000);
}
function zaladuj() {
    document.getElementById("indeks").textContent = String(quiz.obecneZadanie) + "/" + String(quiz.zadania.length);
    document.getElementById("kara").textContent = String(quiz.zadania[quiz.obecneZadanie - 1].karaZaZla);
    document.getElementById("tresc").textContent = quiz.zadania[quiz.obecneZadanie - 1].tresc;
    document.getElementById("odp1").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzA;
    document.getElementById("odp2").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzB;
    document.getElementById("odp3").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzC;
    document.getElementById("odp4").textContent = quiz.zadania[quiz.obecneZadanie - 1].odpowiedzD;
}
function next() {
    if (quiz.obecneZadanie < quiz.zadania.length) {
        quiz.obecneZadanie++;
        zaladuj();
    }
}
function back() {
    if (quiz.obecneZadanie > 1) {
        quiz.obecneZadanie--;
        zaladuj();
    }
}
function odpowiedz(odp) {
    quiz.zadania[quiz.obecneZadanie - 1].odpowiedz = quiz.zadania[quiz.obecneZadanie - 1][odp];
    console.log(quiz.zadania[quiz.obecneZadanie - 1][odp]);
    if (!quiz.zadania[quiz.obecneZadanie - 1].czyRozwiazane)
        quiz.liczbaRozwiazanych++;
    quiz.zadania[quiz.obecneZadanie - 1].czyRozwiazane = true;
    next();
    if (quiz.liczbaRozwiazanych == quiz.zadania.length) {
        quiz.czyRozwiazany = true;
        document.getElementById("stop").style.backgroundColor = "blueviolet";
    }
}
function stopQuiz() {
    if (quiz.czyRozwiazany) {
        var date = new Date();
        var odpowiedzi_1 = [];
        for (var _i = 0, _a = quiz.zadania; _i < _a.length; _i++) {
            var x = _a[_i];
            odpowiedzi_1.push({
                tresc: x.tresc,
                odpowiedz: x.odpowiedz,
                procent: x.czasPoswiecony / quiz.obecnyCzas * 100 + "%"
            });
        }
        console.log(odpowiedzi_1);
        var xhttp2_1 = new XMLHttpRequest();
        xhttp2_1.open("POST", '/podsumowanie', true);
        xhttp2_1.onreadystatechange = function () {
            if (xhttp2_1.readyState == 4)
                location.href = '/';
        };
        xhttp2_1.setRequestHeader("Content-Type", "application/json");
        xhttp2_1.responseType = "json";
        xhttp2_1.send(JSON.stringify({ id: quiz.ID, odpowiedzi: odpowiedzi_1, start: quiz.start }));
    }
}
function czysc() {
    document.getElementById("tresc").textContent = "";
    document.getElementById("odp1").textContent = "";
    document.getElementById("odp2").textContent = "";
    document.getElementById("odp3").textContent = "";
    document.getElementById("odp4").textContent = "";
}
function Anuluj() {
    if (window.confirm("Czy napewno chcesz anulować quiz?")) {
        localStorage.removeItem("currentQuiz");
        window.location.href = 'quiz.jade';
    }
}
// @ts-ignore
var quiz;
var odpowiedzi = [];
// @ts-ignore
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (e) {
    if (xhttp.readyState !== 4 || xhttp.status !== 200)
        return;
    quiz = xhttp.response.quiz;
    czysc();
    zaladuj();
    start();
};
xhttp.open("POST", location.href, true);
xhttp.responseType = "json";
xhttp.send();
