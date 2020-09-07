"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fibonacci = void 0;
var elementWyslij = document.getElementById("wyslij");
var elementZaslon = document.getElementById("okienkoZaslaniajace");
var elementParagraf = document.getElementById("bla");
var elementTextPopup = document.getElementById("tekstOkienka");
var today = new Date();
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
function send() {
    elementZaslon.style.display = "block";
    elementTextPopup.innerText = "Imię: " + document.forms["formu"]["imie"].value + "\n"
        + "Nazwisko: " + document.forms["formu"]["nazwisko"].value + "\n Z:" +
        document.forms["formu"]["skad"].value + "\n Do:" +
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
    return new Promise(function (resolve) { return setTimeout(resolve, 1000); });
}
function teczoweKolory(el) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay()];
                case 1:
                    _a.sent();
                    el.style.background = 'red';
                    return [4 /*yield*/, delay()];
                case 2:
                    _a.sent();
                    el.style.background = 'orange';
                    return [4 /*yield*/, delay()];
                case 3:
                    _a.sent();
                    el.style.background = 'yellow';
                    return [4 /*yield*/, delay()];
                case 4:
                    _a.sent();
                    el.style.background = 'green';
                    return [4 /*yield*/, delay()];
                case 5:
                    _a.sent();
                    el.style.background = 'blue';
                    return [4 /*yield*/, delay()];
                case 6:
                    _a.sent();
                    el.style.background = 'indigo';
                    return [4 /*yield*/, delay()];
                case 7:
                    _a.sent();
                    el.style.background = 'purple';
                    return [2 /*return*/];
            }
        });
    }); })();
}
function Klik() {
    if (document.getElementById("tabelk2").style.backgroundColor != "grey")
        document.getElementById("tabelk2").style.backgroundColor = "grey";
    else
        document.getElementById("tabelk2").style.backgroundColor = "indigo";
}
function fibonacci(x) {
    if (x == 0)
        return 0;
    else if (x == 1)
        return 1;
    else
        return fibonacci(x - 2) + fibonacci(x - 1);
}
exports.fibonacci = fibonacci;
elementParagraf.textContent = "bla";
var nowyElement = document.createElement("div");
nowyElement.innerHTML = "<p>Oto nowy paragraf</p>";
document.body.appendChild(nowyElement);
setTimeout(function () {
    console.log('No już wreszcie.');
}, 2000);
teczoweKolory(document.getElementById("tabelaLotow"));
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits').then(function (response) {
    return response.json();
}).then(function (read) {
    var authorAvatarUrl = read[0].author.avatar_url;
    var makingNewDiv = document.createElement("div");
    makingNewDiv.innerHTML = "<img src=" + authorAvatarUrl + "/>";
    document.body.appendChild(makingNewDiv);
});
var timesClicked = 0;
document.getElementById("myGrid").addEventListener('click', function (event) {
    if (document.getElementById("tabelk2").contains(event.target)
        && !document.getElementById("formu").contains(event.target)) {
        Klik();
        timesClicked++;
    }
    console.log(fibonacci(timesClicked) * 10);
});
document.getElementById("subm").style.display = "none";
document.getElementById("formu").addEventListener('input', function (event) {
    if (checkForm()) {
        document.getElementById("subm").style.display = "inline";
    }
});
