let elementWyslij = document.getElementById("wyslij");
let elementZaslon = document.getElementById("okienkoZaslaniajace");
let elementParagraf = document.getElementById("bla");
let elementTextPopup = document.getElementById("tekstOkienka");
let today = new Date();

function myFunction() {
    if (document.forms["formu"]["imie"].value == "" || document.forms["formu"]["nazwisko"].value == "" 
    || document.forms["formu"]["start"].valueAsDate < today) {
        elementZaslon.style.display = "block";
        if (document.forms["formu"]["imie"].value == ""){
            elementTextPopup.innerText = "Proszę wpisać imię!";
        }
        if (document.forms["formu"]["nazwisko"].value== ""){
            elementTextPopup.innerText = "Proszę wpisać nazwisko!";
        }
        if (document.forms["formu"]["start"].valueAsDate < today){
            elementTextPopup.innerText = "Proszę podać poprawną datę!";
        }
        return false;
    }
    return true;
}

function myFunction2() {
    elementZaslon.style.display = "none";
}

function teczoweKolory(el: HTMLElement) {
    setTimeout(function () {
        console.log('red');
        el.style.backgroundColor = 'red';
        setTimeout(function() {
            el.style.backgroundColor = 'orange';
            setTimeout(function() {
                el.style.backgroundColor = 'yellow';
                setTimeout(function() {
                    el.style.backgroundColor = 'green';
                    setTimeout(function() {
                        el.style.backgroundColor = 'blue';
                        setTimeout(function() {
                            el.style.backgroundColor = 'indigo';
                            setTimeout(function() {
                                el.style.backgroundColor = 'purple';
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

elementParagraf.textContent = "bla";

let nowyElement = document.createElement("div");
nowyElement.innerHTML = "<p>Oto nowy paragraf</p>"; 

document.body.appendChild(nowyElement);

setTimeout(() => {
    console.log('No już wreszcie.');
  }, 2000);

  teczoweKolory(document.getElementById("tabelaLotow"))