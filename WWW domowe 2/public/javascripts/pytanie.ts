// @ts-ignore
class Zadanie {
    tresc: string;
    odpowiedzA: string;
    odpowiedzB: string;
    odpowiedzC: string;
    odpowiedzD: string;
    odpowiedz: string;
    karaZaZla: number;
    czyRozwiazane: boolean;
    czasPoswiecony: number;

    constructor(tresc: string, odpowiedzA: string, odpowiedzB: string, odpowiedzC: string,
                odpowiedzD: string, prawidlowa: number, karaZaZla: number) {
        this.tresc = tresc;
        this.odpowiedzA = odpowiedzA;
        this.odpowiedzB = odpowiedzB;
        this.odpowiedzC = odpowiedzC;
        this.odpowiedzD = odpowiedzD;
        this.karaZaZla = karaZaZla;
        this.czyRozwiazane = false;
        this.czasPoswiecony = 0;
    }

    rozwiaz() {
        this.czyRozwiazane = true;
    }
}

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

function next(): void {
    if (quiz.obecneZadanie < quiz.zadania.length) {
        quiz.obecneZadanie++;
        zaladuj();
    }
}

function back(): void {
    if (quiz.obecneZadanie > 1) {
        quiz.obecneZadanie--;
        zaladuj();
    }
}

function odpowiedz(odp: string): void {
    quiz.zadania[quiz.obecneZadanie-1].odpowiedz = quiz.zadania[quiz.obecneZadanie-1][odp]
    console.log(quiz.zadania[quiz.obecneZadanie-1][odp])
    if(!quiz.zadania[quiz.obecneZadanie-1].czyRozwiazane)
        quiz.liczbaRozwiazanych++
    quiz.zadania[quiz.obecneZadanie-1].czyRozwiazane = true
    next()
    if (quiz.liczbaRozwiazanych == quiz.zadania.length) {
        quiz.czyRozwiazany = true
        document.getElementById("stop").style.backgroundColor = "blueviolet";
    }
}

function stopQuiz(): void {
    if (quiz.czyRozwiazany) {
        let date = new Date();
        let odpowiedzi = []
        for(const x of quiz.zadania) {
            odpowiedzi.push({
                tresc: x.tresc,
                odpowiedz: x.odpowiedz,
                procent: x.czasPoswiecony / quiz.obecnyCzas * 100 + "%"
            })
        }
        console.log(odpowiedzi)
        let xhttp2 = new XMLHttpRequest();
        xhttp2.open("POST", '/podsumowanie', true);
        xhttp2.onreadystatechange = () => {
            if(xhttp2.readyState == 4)
                location.href = '/'
        }
        xhttp2.setRequestHeader("Content-Type", "application/json");
        xhttp2.responseType = "json"
        xhttp2.send(JSON.stringify({ id: quiz.ID, odpowiedzi: odpowiedzi, start: quiz.start }));
    }
}

function czysc(): void {
    document.getElementById("tresc").textContent = "";
    document.getElementById("odp1").textContent = "";
    document.getElementById("odp2").textContent = "";
    document.getElementById("odp3").textContent = "";
    document.getElementById("odp4").textContent = "";
}

function Anuluj(): void {
    if (window.confirm("Czy napewno chcesz anulować quiz?")) {
        localStorage.removeItem("currentQuiz");
        window.location.href = 'quiz.jade';
    }
}

// @ts-ignore
let quiz
let odpowiedzi = []

// @ts-ignore
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(e) {
    if (xhttp.readyState !== 4 || xhttp.status !== 200)
        return
    quiz = xhttp.response.quiz
    czysc();
    zaladuj()
    start();
};

xhttp.open("POST", location.href, true);
xhttp.responseType = "json"
xhttp.send();
