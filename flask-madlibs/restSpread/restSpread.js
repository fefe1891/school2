/*function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
        return num % 2 === 0
    });
}*/

const filterOutOdds = (...nums) => nums.filter(nums => nums % 2 === 0);

console.log(filterOutOdds(1, 2, 3, 4, 5));
console.log(filterOutOdds(6, 7, 8, 9, 10));

/*findMin(1,4,12,-3) // -3
findMin(1,-1) // -1
findMin(3,1) // 1*/
const findMin = (...args) => Math.min(...args);

console.log(findMin(1,4,12,-3));
console.log(findMin(1,-1));
console.log(findMin(3,1));

/*mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}*/

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});

console.log(mergeObjects({a:1, b:2}, {c:3, d:4}));

/*doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
doubleAndReturnArgs([2],10,4) // [2, 20, 8]*/
const doubleAndReturnArgs = (array, ...args) => {
    return [...array, ...args.map(num => num * 2)];
}

console.log(doubleAndReturnArgs([1, 2, 3], 4, 4));
console.log(doubleAndReturnArgs([2], 10, 4));

const removeRandom = items => {
    let itemsCopy = [...items];
    let randomIndex = Math.floor(Math.random() * items.length);
    itemsCopy.splice(randomIndex, 1);
    return itemsCopy;
}

let myArray = [1, 2, 3, 4, 5];
console.log(removeRandom(myArray));
console.log('After removeRandom, myArray is:', myArray);


const extend = (array1, array2) => [...array1, ...array2];
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

console.log(extend(array1, array2));


const addKeyVal = (obj, key, val) => ({...obj, [key]: val});

let myObj = {a: 1, b: 2};
console.log(addKeyVal(myObj, 'c', 3));


const removeKey = (obj, key) => {
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
};

let myObj1 = {a: 1, b: 2, c: 3};
console.log(removeKey(myObj1, 'b'));


const combine = (obj1, obj2) => ({...obj1, ...obj2});

let obj1 = {a: 1, b: 2};
let obj2 = {b: 3, c: 4};
console.log(combine(obj1, obj2));


const update = (obj, key, val) => {
    return {...obj, [key]: val};
};

let myObj2 = {a: 1, b: 2,c: 3};
console.log(update(myObj2, 'b', 4));
console.log(update(myObj2, 'd', 5));