// forEach Functions
function doubleValues(arr) {
    // Blank array to store doubled elements in
    let doubled = [];
    // For each method to double each element
    arr.forEach(element => {
        doubled.push(element * 2);
    });
    // Return doubled elements
    return doubled;
}

function onlyEvenValues(arr) {
    let evens = [];
    // This for each checks if the values are even by modulo 2 and seeing if the remainder is equal to 0
    arr.forEach(element => {
        if(element % 2 === 0)
            evens.push(element);
    });
    return evens;
}

function showFirstAndLast(arr) {
    let firstLast = [];
    arr.forEach(element => {
        // We need to add the first and last char of the string to a new blank string
        let s = element.charAt(0);
        s += element.charAt(element.length-1);
        // Now push that into the new array
        firstLast.push(s);
    });
    return firstLast;
}

function addKeyAndValue(arr, key, value) {
    // We return the array that gets passed to the function
    arr.forEach(element => {
        element[key] = value;
    });
    return arr;
}

function vowelCount(str) {
    // Create a blank object we can return
    let vowels = new Object();
    // Create a new array so we can forEach it
    let arr = Array.from(str);
    arr.forEach(element => {
        // The if statement checks to see if the character is a vowel
        if('aeiouAEIOU'.includes(element)) {
            // set character to lower case so we don't encounter case issues
            let v = element.toLowerCase();
            // Check to see if we have already created this property
            if(vowels.hasOwnProperty(v)) {
                // If it does simply increment the value
                vowels[v] += 1;
            } // else create the key/value at 1
            else {
                vowels[v] = 1;
            }
        }
    });
    return vowels;
}

// map Functions
function doubleValuesWithMap(arr) {
    return arr.map(function(value) {
        return value * 2;
    })
}

function valTimesIndex(arr) {
    return arr.map(function(value, index) {
        return value * index;
    })
}

function extractKey(arr, key) {
    return arr.map(function(value) {
        return value[key];
    })
}

function extractFullName(arr) {
    return arr.map(function(value) {
        return `${value.first} ${value.last}`;
    })
}

// filter Functions
function filterByValue(arr, key) {
    return arr.filter(function(value) {
        return value.hasOwnProperty(key);
    })
}

function find(arr, search) {
    // Store filter results in an array because we need to further refine what we return from here
    let results = arr.filter(function(value) {
        return value === search;
    })
    // If the results array has no values in it return undefined
    if(results.length === 0)
        return undefined;
    // Else return the first value in the array
    return results[0];
}

function findInObj(arr, key, search) {
    // This is basically the same as the above function
    let results = arr.filter(function(value) {
        return value[key] === search;
    })
    // If the results array has no values in it return undefined
    if(results.length === 0)
        return undefined;
    // Else return the first value in the array
    return results[0];
}

function removeVowels(str) {
    // lower case the string because our return result will also be all lowercase
    str = str.toLowerCase();
    let arr = Array.from(str).filter(function(value) {
        // Need to negate the .includes so we get all characters that are not vowels
        return !'aeiou'.includes(value);
    })
    return arr.join('');
}

function doubleOddNumbers(arr) {
    // First filter out all odds
    let odds = arr.filter(function(value) {
        return value % 2 !== 0;
    })
    // Then double and return them
    return odds.map(function(value) {
        return value * 2;
    })
}