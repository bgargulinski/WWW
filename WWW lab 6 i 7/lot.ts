
const ul = document.getElementById("pasazerowie");
const items = ul.getElementsByTagName("li");
let wynik = items[0];
for (let i = 1; i < items.length; ++i) {
    if (items[i].getAttribute("data-identyfikator-pasazera") < wynik.getAttribute("data-identyfikator-pasazera"))
        wynik = items[i];
}

console.log(wynik.textContent);