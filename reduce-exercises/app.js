const arr = [
  { name: "Elie" },
  { name: "Tim" },
  { name: "Matt" },
  { name: "Colt" },
];

function extractValue(arr, key) {
  // Pass in an empty array as the initial value so we can push values to it
  // Then return that array to keep building it
  return arr.reduce(function (result, next) {
    result.push(next[key]);
    return result;
  }, []);
}

function vowelCount(str) {
  // Lower case the string so it's case insensitive
  str = str.toLowerCase();
  return str.split("").reduce(function (chars, next) {
    // Check if the current character is a vowel
    // Add them to the object, or increment if already there
    if ("aeiou".indexOf(next) !== -1) {
      if (chars[next]) chars[next] += 1;
      else chars[next] = 1;
    }
    return chars;
  }, {});
}

function addKeyAndValue(arr, key, value) {
  // We need to return the same array but updated, so store the changed one in an array
  update = arr.reduce(function (result, next) {
    next[key] = value;
    result.push(next);
    return result;
  }, []);
  // then update the old array variable with the new array and return it
  arr = update;
  return arr;
}

// test function for partition function
function isEven(val) {
  return val % 2 === 0;
}
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
function isLongerThanThreeCharacters(val) {
  return val.length > 3;
}
const names = ["Elie", "Colt", "Tim", "Matt"];

function partition(arr, callback) {
  return arr.reduce(
    function (res, next) {
      // simply if the callback function returns true add to the left array and if false add to the right
      if (callback(next)) res[0].push(next);
      else res[1].push(next);
      return res;
    },
    [[], []]
  );
}
