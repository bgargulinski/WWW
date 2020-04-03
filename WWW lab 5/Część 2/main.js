var element1 = document.getElementById("wyslij");
var element2 = document.getElementById("okienkoZaslaniajace");
var element3 = document.getElementById("bla");
var element4 = document.getElementById("tekstOkienka");
var today = new Date();

function myFunction() {
    if (document.getElementById("imie").value == "" || document.getElementById("nazwisko").value == "" 
    || document.getElementById("start").valueAsDate < today) {
        element2.style.display = "block";
        if (document.getElementById("imie").value == "")
            element4.innerText = "Proszę wpisać imię!";
        if (document.getElementById("nazwisko").value == "")
            element4.innerText = "Proszę wpisać nazwisko!";
        if (document.getElementById("start").valueAsDate < today)
            element4.innerText = "Proszę podać poprawną datę!";
    }
}

function myFunction2() {
    element2.style.display = "none";
}

element3.textContent = "bla";

var nowyElement = document.createElement("div");
nowyElement.innerHTML = "<p>Oto nowy paragraf</p>";

document.body.appendChild(nowyElement);