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

function wroc(): void{
    window.location.href = './main.html';
}

let wyniki: [number, string, Quiz][] = JSON.parse(localStorage.getItem("wyniki"));
var tabelka = <HTMLTableSectionElement> document.getElementById("cialo");

for (let i = 0; i < 10 && i < wyniki.length; i++){
    let row = <HTMLTableRowElement> tabelka.insertRow(i);
    let cell1 = <HTMLTableCellElement> row.insertCell(0);
    let cell2 = <HTMLTableCellElement> row.insertCell(1);

    cell2.textContent = String(wyniki[i][0]);
    cell1.textContent = wyniki[i][1];
}