//1.
// [1,2,3,4]

//2.
// "ref"

//3.
// {
//   0: {Array(3) => true}
//   1: {Array(3) => false}
// }

const hasDuplicate = (arr) => arr.length !== new Set(arr).size;

function vowelCount(str) {
  // Lower case the string so we can be sure we grab all characters
  str = str.toLowerCase();
  // Split the string into an array so we can iterate through it
  let strArr = str.split("");
  // Create the map so we can add the key/values to it
  let m = new Map();
  for (let char of strArr) {
    if ("aeiou".includes(char)) {
      if (m.has(char)) {
        //increment the value
        m.set(char, m.get(char) + 1);
      } else {
        //add the key
        m.set(char, 1);
      }
    }
  }
  // Return the map
  return m;
}
