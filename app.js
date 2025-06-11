// console.log('Hello');

// function multiply(a, b, c) {
//   return a * b * c;
// }

// // curry
// function test1(a) {
//   // each returned function is a partially applied function
//   return function test2(b) {
//     return function test3(c) {
//       return a * b * c;
//     };
//   };
// }

// console.log(multiply(1, 2, 3));

// console.log(test1(1)(2)(3));

const add2 = x => x + 2; 
const subtract1 = x => x - 1; 
const multiply10 = x => x * 10; 


const res = multiply10(subtract1(add2(5)));

// composition is process of combining two or more functions to produce a new function 
// the result of one function is passed as the input to the next function
// in this case, we are composing three functions: add2, subtract1, and multiply10
// the result of add2(5) is passed to subtract1, and the result of that is passed to multiply10
// this is a simple example of function composition
// the result of the composition is 60
// from left to right, we first add 2 to 5, then subtract 1, and finally multiply by 10

const compose = function (...fns) {
   return function (val) {
        return fns.reduceRight((acc, fn) => fn(acc), val);
   }
}


const compose2 = (...fns) => (val) => fns.reduceRight((acc, fn) => fn(acc), val);


// pipeLine is similar to composition, but the functions are applied from left to right
// the result of one function is passed as the input to the next function
const pipeLine = function (...fns) {
    return function (val) {
        return fns.reduce((acc, fn) => fn(acc), val);
    }
}



const newRes = compose(multiply10, subtract1, add2)(5);
const newRes2 = pipeLine(add2, subtract1, multiply10)(5);


console.log(res)
console.log(newRes);
console.log(newRes2);

// Used in lodash, ramda, and other libraries
// lodash: _.flowRight => compose
// ramda: R.compose => compose
// lodash: _.flow => pipe
// ramda: R.pipe => pipe


// Pure function 
// Example:
calculateTotalWithTax(100, 0.08); // 108
function calculateTotalWithTax(price, taxRate) {
  return price + (price * taxRate);
}

// Immutable data structures are data structures that cannot be modified after they are created
const cart = ["apple"];
const updatedCart = addItemToCart(cart, "banana");

function addItemToCart(cart, item) {
    return [...cart, item]; // returns a new array with the item added
}

// Referential transparency
// A function is referentially transparent if it can be replaced with its value without changing the program's behavior
let discount = 0.1;

function getFinalPrice(price, discount) {
  return price - (price * discount);
}


// Map 

squareNumbers([1, 2, 3]); // [1, 4, 9]
function squareNumbers(numbers) {
  return numbers.map(num => num * num);
}

// Filter
const people = [{ name: "Alice", age: 17 }, { name: "Bob", age: 22 }];
getAdults(people); // [{ name: "Bob", age: 22 }]


function getAdults(people) {
    return people.filter(person => person.age >= 18); 
}

// Reduce
sumOfEvenNumbers([1, 2, 3, 4]); // 6

function sumOfEvenNumbers(numbers) {
    return numbers.reduce((sum, num) => {
        return num % 2 === 0 ? sum + num : sum;
    }, 0)
}

// Some 
hasNegative([1, -2, 3]); // true

function hasNegative(numbers) {
    return numbers.some(number => number < 0); 
}

// Every
areAllStrings(["hello", "world"]); // true
areAllStrings(["hello", 42]); // false

function areAllStrings(arr) {
    return arr.everuy(item => typeof item === 'string');
}

// Currying 
const double = multiply(2);
double(5); // 10

function multiply(val) {
    return function (num) {
        return val * num;
    }
}

// Partial Application
const sayHello = greet("Hello");
sayHello("Alice"); // "Hello, Alice"

function greet(gretting) {
    // gretting is a parameter that will be used in the returned function
    // this is a closure, gretting is captured in the returned function's scope
    // so it can be used later when the returned function is called
    // this is a form of partial application
    // the returned function is a new function that takes a name as an argument
    // and returns a greeting message
    return function (name) {
        return `${gretting}, ${name}`;
    }
}

// Function composition (from right to left) 
const trim = str => str.trim(); 
const toLowerCase = str => str.toLowerCase();
const addExclamation = str => `${str}!`;


const processed_string = compose(addExclamation, toLowerCase, trim)(" Hello WORLD "); 

// PipeLines (from left to right)
const processed_string2 = pipeLine(trim, toLowerCase, addExclamation)(" Hello WORLD ");

// another pipe utlity 
const doubleNum = x => x * 2;
const increment = x => x + 1;
const toString = x => x.toString();

const processValue = pipeLine(doubleNum, increment, toString);