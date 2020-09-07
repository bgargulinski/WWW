import { fib } from "./fib";

import { expect } from "chai";

import "mocha";

describe("Fibonacci", () => {

    it("should equal 0 for call with 0", () => {

        expect(fib(0)).to.equal(0);

    });

    it("should equal 13 for call with 7", () => {

        expect(fib(7)).to.equal(13);

    });

});