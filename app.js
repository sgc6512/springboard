function countdown(num) {
    let intID = setInterval(function() {
        display(num);
        num--;
        if (num < 0) {
            clearInterval(intID);
        }
    }, 1000)
}

function display(num) {
    if(num === 0) {
        console.log("DONE!");
    }
    else
        console.log(num);
}

function randomGame() {
    let count = 0;
    let intID = setInterval(function () {
        count++;
        let num = Math.random();
        if(num > 0.75) {
            console.log(count);
            clearInterval(intID);
        }
    }, 1000)
}
