var elementWyslij = document.getElementById("wyslij");
var elementZaslon = document.getElementById("okienkoZaslaniajace");
var elementParagraf = document.getElementById("bla");
var elementTextPopup = document.getElementById("tekstOkienka");
var today = new Date();

function myFunction() {
    if (document.getElementById("imie").value == "" || document.getElementById("nazwisko").value == "" 
    || document.getElementById("start").valueAsDate < today) {
        elementZaslon.style.display = "block";
        if (document.getElementById("imie").value == "")
            elementTextPopup.innerText = "Proszę wpisać imię!";
        if (document.getElementById("nazwisko").value == "")
            elementTextPopup.innerText = "Proszę wpisać nazwisko!";
        if (document.getElementById("start").valueAsDate < today)
            elementTextPopup.innerText = "Proszę podać poprawną datę!";
    }
}

function myFunction2() {
    elementZaslon.style.display = "none";
}

elementParagraf.textContent = "bla";

var nowyElement = document.createElement("div");
nowyElement.innerHTML = "<p>Oto nowy paragraf</p>";

document.body.appendChild(nowyElement);