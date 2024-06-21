//new Set([1,1,2,2,3,4]

const mySet = new Set([1,1,2,2,3,4]);
console.log(mySet);//(4) {1, 2, 3, 4}

//[...new Set("referee")].join("")

const mySet2 = new Set("referee");
const myArray = [...mySet2];
const myString = myArray.join("");

console.log(myString); // "ref"


let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

console.log(m);
/*Map(2) {
     [1, 2, 3] => true,
     [1, 2, 3] => false
 }
 */


const hasDuplicate = arr => new Set(arr).size !== arr.length;

console.log(hasDuplicate([1,3,2,1])); // true
console.log(hasDuplicate([1,5,-1,4])); // false


const vowelCount = str => {
    const vowelMap = new Map();
    for(let char of str.toLowerCase()) {
        if('aeiou'.includes(char)) {
            if(vowelMap.has(char)) {
                vowelMap.set(char, vowelMap.get(char)+1);
            } else {
                vowelMap.set(char, 1);
            }
        }
    }
    return vowelMap;
};

console.log(vowelCount('awesome'));//Map(3){'a' => 1, 'e' => 2, 'o' => 1}
console.log(vowelCount('Colt'));//Map(1){'o' => 1}