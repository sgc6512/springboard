function findUserByUsername(arr, str) {
  return arr.find(function (obj) {
    // Simply return the first object that the username key matches our inputted string
    return obj.username === str;
  });
}

function removeUser(arr, str) {
  // Find the index of the user to remove
  let index = arr.findIndex(function (obj) {
    return obj.username === str;
  });
  // If it was in the array
  if (index === 1) {
    // Remove it from the array and return the object we removed
    return arr.splice(index, 1)[0];
  }
  // Else return undefined
  return undefined;
}

const users = [
  { username: "mlewis" },
  { username: "akagen" },
  { username: "msmith" },
];
