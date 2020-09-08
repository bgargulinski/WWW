import { runInThisContext } from "vm";

export class Meme {
    id: number;
    name: string;
    price: number;
    pastPrices: number[];
    url: string;

    constructor(id: number, name: string, price: number, pastPrices: number[], url: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.pastPrices = pastPrices;
        this.url = url;
    }

    change_price(cost: string){
        if(this.pastPrices.length == 0)
            this.pastPrices = [this.price];
        else
            this.pastPrices.push(this.price);
        this.price = Number(cost);
    }
}

export class MemeManager {
    memes: Meme[];

    constructor(memes: Meme[]) {
        this.memes = memes;
    }

    getThreeBest = () => {
        let memes_sorted = this.memes.sort((m1, m2) => (m1.price > m2.price ? -1 : 1));
        return memes_sorted.slice(0, 3);
    }

    getById(id: number) {
        for (const m of this.memes) {
            if (m.id == id) {
                return m
            }
        }
        return null;
    }
}

const m1 = new Meme(10, 'Gold', 1000, [123,431], 'https://i.redd.it/h7rplf9jt8y21.png');
const m2 = new Meme(9, 'Platinum', 1100, [321,341], 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg');
const m3 = new Meme(8, 'Elite', 1200, [431,123], 'https://i.imgflip.com/30zz5g.jpg');

export let manager = new MemeManager([m1, m2, m3]);

