// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }

// ES2015 Version
// const filterOutOdds = (...args) => args.filter((num) => num % 2 === 0);
// Two different ways to do this
function filterOutOdds(...args) {
  return args.filter((num) => num % 2 === 0);
}
console.log(filterOutOdds(1, 2, 3, 4, 5, 6, 7, 8, 9));

function findMin(...args) {
  // We can use reduce to find the min and put it on a single line with a ternary operator
  return args.reduce((num, next) => (num < next ? num : next));
}
console.log(findMin(1, 4, 12, -3));
console.log(findMin(1, -1));
console.log(findMin(3, 1));

function mergeObjects(obj1, obj2) {
  // Use a spread on each to merge them
  return { ...obj1, ...obj2 };
}
console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 })); // {a:1, b:2, c:3, d:4}

function doubleAndReturnArgs(arr, ...args) {
  // double all additional args
  doubled = args.map((num) => num * 2);
  // return the two arrays combined together
  return [...arr, ...doubled];
}
console.log(doubleAndReturnArgs([1, 2, 3], 4, 4)); // [1,2,3,8,8]
console.log(doubleAndReturnArgs([2], 10, 4)); // [2, 20, 8]

const removeRandom = (items) => {
  // Use math random function to get a random number and then use slice to take it out of the array
  let randId = Math.floor(Math.random() * items.length);
  return [...items.slice(0, randId), ...items.slice(randId + 1)];
};
console.log(removeRandom([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const extend = (array1, array2) => [...array1, ...array2];
console.log(extend([1, 2, 3], [4, 5, 6]));

const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });
console.log(addKeyVal({ name: "John" }, "age", 20));

const removeKey = (obj, key) => {
  // have to return a new object for these so create a new one and delete that key
  let newObj = { ...obj };
  delete newObj[key];
  return newObj;
};
const person = { name: "John", age: 20 };
console.log(removeKey(person, "name"));

// Very simple just use spread to combine the two objects, need to wrap with () to not have an error
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });
console.log(combine({ name: "John" }, { age: 20 }));

const update = (obj, key, val) => {
  // Create a new object to return and update the key with a new value
  let newObj = { ...obj };
  newObj[key] = val;
  return newObj;
};
console.log(update({ name: "John", age: 20 }, "name", "Steve"));
