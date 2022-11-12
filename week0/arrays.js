const myArray = [1, 10, 3, 6, 'ArrayElement'];
/** 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

console.log(`3: ${myArray[2]}`);
console.log(`6: ${myArray[3]}`);
console.log(`3: ${myArray.at(2)}`);
console.log(`3: ${myArray.at(3)}`);

/**
 *  2. Log type of each element
 */

myArray.forEach((items) => {
    console.log(typeof items);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.every((element) => typeof element === 'number');

console.log({
    isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.some((element) => element > 5);

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.filter((item) => item > 5);

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.map((item) => ((typeof item === 'number') ? item * 2 : item));

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */
const y = 0;
const sum = myArray.reduce((sumTwo, element) => ((typeof element === 'number') ? (sumTwo + element) : sumTwo), y);

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.slice(0).sort((a, b) => a - b);
const desc = myArray.slice(0).sort((a, b) => a - b).reverse();

console.log({
    asc,
    desc,
});