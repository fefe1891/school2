const createInstructor = (firstName, lastName) => ({firstName, lastName});
console.log(createInstructor('Jon', 'Doe'));

let favoriteNumber = 42;

let instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
};
console.log(instructor[42]);


let instructor1 = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return `${this.firstName} says bye!`;
    }
};

console.log(instructor1.sayHi());
console.log(instructor1.sayBye());


const createAnimal = (species, verb, noise) => {
    return {
        species, [verb]() {
            return noise;
        }
    };
};

const d = createAnimal("dog", "bark", "woooof!");
console.log(d.species);
console.log(d.bark());

const s = createAnimal("sheep", "bleet", "BAAAAaaaa");
console.log(s.species);
console.log(s.bleet());