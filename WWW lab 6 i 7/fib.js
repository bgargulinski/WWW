"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fib = void 0;
function fib(x) {
    if (x == 0)
        return 0;
    else if (x == 1)
        return 1;
    else
        return fib(x - 2) + fib(x - 1);
}
exports.fib = fib;
