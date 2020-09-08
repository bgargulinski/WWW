// @ts-ignore
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

// @ts-ignore
class Quiz {
    zadania: Zadanie[];
    obecnyCzas: number;
    obecneZadanie: number;
    liczbaRozwiazanych: number;
    czyRozwiazny: boolean;
    wstep: string;
    tytul: string;
    ID: number;

    constructor(zadania: Zadanie[], tytul: string, wstep: string, ID: number) {
        this.zadania = zadania;
        this.obecneZadanie = 1;
        this.obecnyCzas = 0;
        this.czyRozwiazny = false;
        this.liczbaRozwiazanych = 0;
        this.wstep = wstep;
        this.tytul = tytul;
        this.ID = ID;
    }
}

// @ts-ignore
class ZadanieDoStat {
    numerZad: number;
    CzyPrawidlowa: boolean;
    kara: number;
    czasNaZadanie: number;

    constructor(numerZad: number, CzyPrawidlowa: boolean, kara: number, czasNaZadanie: number){
        this.numerZad = numerZad;
        this.CzyPrawidlowa = CzyPrawidlowa;
        this.kara = kara;
        this.czasNaZadanie = czasNaZadanie;
    }
}

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
