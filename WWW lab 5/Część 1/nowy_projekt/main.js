var Pilot = /** @class */ (function () {
    function Pilot() {
    }
    return Pilot;
}());
var jsonString = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
function sprawdzDaneLiniiLotniczej(dane) {
    return dane.piloci !== undefined;
}
var daneLiniiLotniczej = JSON.parse(jsonString);
if (sprawdzDaneLiniiLotniczej(daneLiniiLotniczej)) {
    var juzNaPewnoDaneLinii = daneLiniiLotniczej;
    console.log(juzNaPewnoDaneLinii.piloci.length);
}
