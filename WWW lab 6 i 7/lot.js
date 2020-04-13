var ul = document.getElementById("pasazerowie");
var items = ul.getElementsByTagName("li");
var wynik = items[0];
for (var i = 1; i < items.length; ++i) {
    if (items[i].getAttribute("data-identyfikator-pasazera") < wynik.getAttribute("data-identyfikator-pasazera"))
        wynik = items[i];
}
console.log(wynik.textContent);
