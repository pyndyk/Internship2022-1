/* eslint-disable prefer-rest-params */
/* eslint-disable no-plusplus */
const prompt = require('prompt-sync')();

/*
    1.funcion that accepts your firstName and lastName
     * Should return 'I'm firstName lastName'
    */
function sayWho() {
    const firstName = prompt(' what is your firstname  ');
    const lastName = prompt(' what is your lastname  ');

    return `I am ${firstName} ${lastName}`;
}

console.log(sayWho());

/*
2. a function that accepts numbers and return their sum
 * No limits for arguments count
*/
function countSum() {
    let sum = 0;

    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return sum;
}

console.log(countSum(4, 5, 23));
console.log(countSum(10, 50, 212, 300, 22));
console.log(countSum(1, 2));

/*
3. a function that count number of letters in provided string
*/
function countLetters(string, letter) {
    let result = 0;
    const array = string.split('');

    for (let i = 0; i < array.length; i++) {
        if (array[i] === letter) {
            result++;
        }
    }

    return result;
}

console.log(countLetters('Node developer', 'd'));

/*
4. afunction that will return random integer in range that you provided
*/

function getRandom(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

console.log(getRandom(0, 10));
console.log(getRandom(90, 200));