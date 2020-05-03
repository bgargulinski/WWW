class Zadanie {
    tresc: string;
    odpowiedzA: string;
    odpowiedzB: string;
    odpowiedzC: string;
    odpowiedzD: string;
    prawidlowa: number;
    karaZaZla: number;
    czyRozwiazane: boolean;
    czyPoprawnie: boolean;
    czasPoswiecony: number;

    constructor(tresc: string, odpowiedzA: string, odpowiedzB: string, odpowiedzC: string,
        odpowiedzD: string, prawidlowa: number, karaZaZla: number) {
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
    zadania: Zadanie[];
    obecnyCzas: number;
    obecneZadanie: number;
    liczbaRozwiazanych: number;
    czyRozwiazny: boolean;
    wstep: string;

    constructor(zadania: Zadanie[], wstep: string) {
        this.zadania = zadania;
        this.obecneZadanie = 1;
        this.obecnyCzas = 0;
        this.czyRozwiazny = false;
        this.liczbaRozwiazanych = 0;
        this.wstep = wstep;
    }
}

function Zapisz(quiz: Quiz, punkty: number) {
    let wyniki: [number, string, Quiz][];

    var osoba = prompt("Podaj swoje imię", "Twoje imię");

    if (localStorage.getItem("wyniki") == null) {
        wyniki = [[punkty, osoba, quiz]];
    }
    else {
        wyniki = JSON.parse(localStorage.getItem("wyniki"));
        wyniki.push([punkty, osoba, quiz]);
    }

    wyniki.sort((n1, n2) => n1[0] - n2[0]);

    localStorage.setItem("wyniki", JSON.stringify(wyniki));

    window.location.href = './main.html';
}

function Odrzuc(): void {
    window.location.href = './main.html';
}

let quiz = JSON.parse(localStorage.getItem("currentQuiz"));

var tabelka = <HTMLTableSectionElement>document.getElementById("cialo");

let wynik:number = quiz.obecnyCzas / 1000;

for (let i = 0; i < quiz.zadania.length; i++) {
    let row = <HTMLTableRowElement>tabelka.insertRow(i);
    let cell1 = <HTMLTableCellElement>row.insertCell(0);
    let cell2 = <HTMLTableCellElement>row.insertCell(1);
    let cell3 = <HTMLTableCellElement>row.insertCell(2);
    let cell4 = <HTMLTableCellElement>row.insertCell(3);

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