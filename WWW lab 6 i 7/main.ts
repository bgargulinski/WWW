let elementWyslij = document.getElementById("wyslij");
let elementZaslon = document.getElementById("okienkoZaslaniajace");
let elementParagraf = document.getElementById("bla");
let elementTextPopup = document.getElementById("tekstOkienka");
let today = new Date();

function myFunction() {
    if (document.forms["formu"]["imie"].value == "" || document.forms["formu"]["nazwisko"].value == ""
        || document.forms["formu"]["start"].valueAsDate < today) {
        elementZaslon.style.display = "block";
        if (document.forms["formu"]["imie"].value == "") {
            elementTextPopup.innerText = "Proszę wpisać imię!";
        }
        if (document.forms["formu"]["nazwisko"].value == "") {
            elementTextPopup.innerText = "Proszę wpisać nazwisko!";
        }
        if (document.forms["formu"]["start"].valueAsDate < today) {
            elementTextPopup.innerText = "Proszę podać poprawną datę!";
        }
        return false;
    }
    return true;
}

function send(){
    elementZaslon.style.display = "block";

    elementTextPopup.innerText = "Imię: " + document.forms["formu"]["imie"].value + "\n"
    + "Nazwisko: " + document.forms["formu"]["nazwisko"].value + "\n Z:" +
        document.forms["formu"]["skad"].value +"\n Do:" +
    document.forms["formu"]["dokad"].value + "\n Data:" +
        document.forms["formu"]["start"].value;

    return false;
}

function checkForm() {
    if (document.forms["formu"]["imie"].value == "" || document.forms["formu"]["nazwisko"].value == ""
        || document.forms["formu"]["start"].valueAsDate < today) {
        return false;
    }
    return true;
}

function myFunction2() {
    elementZaslon.style.display = "none";
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}


function teczoweKolory(el: HTMLElement) {
    (async () => {
        await delay();
        el.style.background = 'red';
        await delay();
        el.style.background = 'orange';
        await delay();
        el.style.background = 'yellow';
        await delay();
        el.style.background = 'green';
        await delay();
        el.style.background = 'blue';
        await delay();
        el.style.background = 'indigo';
        await delay();
        el.style.background = 'purple';
    })();
}



function Klik() {
    if(document.getElementById("tabelk2").style.backgroundColor != "grey")
        document.getElementById("tabelk2").style.backgroundColor = "grey";
    else
        document.getElementById("tabelk2").style.backgroundColor = "indigo";
}

export function fibonacci(x){
    if(x == 0)
        return 0;
    else if (x == 1)
        return 1;
    else
        return fibonacci(x - 2) + fibonacci(x - 1);
}

elementParagraf.textContent = "bla";

const nowyElement = document.createElement("div");
nowyElement.innerHTML = "<p>Oto nowy paragraf</p>";

document.body.appendChild(nowyElement);

setTimeout(() => {
    console.log('No już wreszcie.');
}, 2000);

teczoweKolory(document.getElementById("tabelaLotow"))

fetch('https://api.github.com/repos/Microsoft/TypeScript/commits').then((response) => {
        return response.json();
    }).then((read) => {
        const authorAvatarUrl: string = read[0].author.avatar_url;
        const makingNewDiv = document.createElement("div");
        makingNewDiv.innerHTML = "<img src=" + authorAvatarUrl + "/>";
        document.body.appendChild(makingNewDiv);
});

let timesClicked = 0;

document.getElementById("myGrid").addEventListener('click', (event) => {
    if (document.getElementById("tabelk2").contains(event.target as Node)
    && !document.getElementById("formu").contains(event.target as Node) ){
        Klik();
        timesClicked++;
    }

    console.log(fibonacci(timesClicked) * 10)
});

document.getElementById("subm").style.display = "none";
    document.getElementById("formu").addEventListener('input', (event) => {
   if (checkForm()){
       document.getElementById("subm").style.display = "inline";
   }
});


