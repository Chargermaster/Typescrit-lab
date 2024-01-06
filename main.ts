const p: number = 1000000;
const r: number = 0.0025;
const n: number = 300;
let m: number = 0;
m = p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
console.log(Math.ceil(m));
