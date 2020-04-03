interface ILotnisko {
    label: string;
    city: string;
    numbers: number[];
}

class Pilot {
    public name: string;
}

interface ILiniaLotnicza {
    piloci: Pilot[];
    lotniska: ILotnisko[];
}

let jsonString: string = `{
    "piloci": [
        "Pirx",
        "Exupery",
        "Idzikowski",
        "Główczewski"
    ],
    "lotniska": {
        "WAW": ["Warszawa", [3690, 2800]],
        "NRT": ["Narita", [4000, 2500]],
        "BQH": ["Biggin Hill", [1802, 792]],
        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]
    }
}`;

function sprawdzDaneLiniiLotniczej(dane: any): dane is ILiniaLotnicza{
    return dane.piloci !== undefined;
}

let daneLiniiLotniczej = JSON.parse(jsonString);

if(sprawdzDaneLiniiLotniczej(daneLiniiLotniczej)) {
    let juzNaPewnoDaneLinii = daneLiniiLotniczej;
    console.log(juzNaPewnoDaneLinii.piloci.length);
}


