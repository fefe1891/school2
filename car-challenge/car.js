class Vehicle {
      constructor(make, model, year) {
          this.make = make;
          this.model = model;
          this.year = year;
      }
  
      honk() {
          return "Beep.";
      }
  
      toString() {
          return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
      }
  }
  
  let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
  console.log(myFirstVehicle.honk());
  console.log(myFirstVehicle.toString());
  
  class Car extends Vehicle {
      constructor(make, model, year) {
              super(make, model, year);
              this.numWheels = 4;
          }
  }
  
  let myFirstCar = new Car("Toyota", "Corolla", 2005);
  console.log(myFirstCar);
  console.log(myFirstCar.honk());
  console.log(myFirstCar.toString());
  console.log(myFirstCar.numWheels)
  
  class Motorcycle extends Vehicle {
      constructor(make, model, year) {
          super(make, model, year);
          this.numsWheels = 2;
  
      }
  
      revEngine() {
          return "VROOM!";
      }
  }
  
  let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
  console.log(myFirstMotorcycle);
  console.log(myFirstMotorcycle.honk());
  console.log(myFirstMotorcycle.toString());
  console.log(myFirstMotorcycle.revEngine());
  console.log(myFirstMotorcycle.numWheels());
  
  class Garage {
      constructor(capacity) {
          this.vehicles = [];
          this.capacity = capacity;
      }
  
      add(vehicle) {
          if (!(vehicle instanceof Vehicle)) {
              return "only vehicles are allowed in here!";
          }
          if (this.vehicles.length >= this.capacity) {
              return "Sorry, we're full.";
          }
          this.vehicles.push(vehicle);
          return "Vehicle added!";
      }
  }
  
  let garage = new Garage(2);
  console.log(garage);
  console.log(garage.add(new Car("Hyundai", "Elantra", 2015)));
  console.log(garage.vehicles);
  console.log(garage.add("Taco"));
  console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2000)));
  console.log(garage.vehicles);
  console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2001)));
  
  