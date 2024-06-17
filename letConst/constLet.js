const PI = 3.14;

const totalPlants = 30;
console.log(totalPlants);

let currentPlants = 29;
if (currentPlants < totalPlants) {
    let newPlants = totalPlants - currentPlants;
    console.log(`New plants possible: ${newPlants}`);

    currentPlants += 1;
}

console.log(totalPlants);