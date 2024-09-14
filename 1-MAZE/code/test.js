

let a=new Set();
a.add([1,2]);
a.add([1,2]);
a.add([1,3]);
a.add([1,4]);

console.log(a)
console.log(a.has([1,2]))
console.log([1,2].join(','))