// Some functions
function hasOddNumber(arr) {
    return arr.some(function(element) {
        // Return if there is any remainder after modulo 2
        return element % 2 !== 0;
    })
}

function hasAZero(num) {
    // Create array from some number cast to String so it works
    return Array.from(String(num)).some(function(digit) {
        // Return if a digit in that number is zero
        return digit === '0';
    })
}

// Every functions
function hasOnlyOddNumbers(arr) {
    return arr.every(function(num) {
        // Works same as hasOddNumber but with the every function rather than some
        return num % 2 !== 0;
    })
}

function hasNoDuplicates(arr) {
    // There is probably a better way to do this
    // After looking at the solution arr.indexOf and arr.lastIndexOf works better
    return arr.every(function(num, index, array) {
        // Increment through the entire array comparing if the num is equal to any other value in the array except itself
        for(let i = 0; i < array.length; i++) {
            if(i === index)
                return true;
            return num !== array[i];
        }
    })
}

function hasCertainKey(arr, key) {
    // Simple check to see if key is in the object
    return arr.every(function(obj) {
        return obj.hasOwnProperty(key)
    })
}

function hasCertainValue(arr, key, value) {
    return arr.every(function(obj) {
        return obj[key] === value;
    })
}