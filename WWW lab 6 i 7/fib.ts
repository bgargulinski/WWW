export function fib(x){
    if(x == 0)
        return 0;
    else if (x == 1)
        return 1;
    else
        return fib(x - 2) + fib(x - 1);
}