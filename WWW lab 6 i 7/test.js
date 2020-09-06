"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fib_1 = require("./fib");
var chai_1 = require("chai");
require("mocha");
describe("Fibonacci", function () {
    it("should equal 0 for call with 0", function () {
        chai_1.expect(fib_1.fib(0)).to.equal(0);
    });
    it("should equal 0 for call with 7", function () {
        chai_1.expect(fib_1.fib(7)).to.equal(0);
    });
});
