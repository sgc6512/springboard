// Class for vehicle
class Vehicle {
  // Constructor takes in and sets some default values
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  // Simply return beep
  honk() {
    return "Beep.";
  }

  // Use string builder and the this. function to return the objects properties
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
  }
}

// Class for car inherits vehicle
class Car extends Vehicle {
  // Call super to use the parents constructor
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

// Class for motorcycle
class Motorcycle extends Vehicle {
  // Call super to to use the parents constructor
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  // Simply return vroom
  revEngine() {
    return "VROOM!!!";
  }
}

// Class for garage
class Garage {
  // Constructor needs a capacity value
  constructor(capacity) {
    // Empty array to store vehicles
    this.vehicles = [];
    this.capacity = capacity;
  }

  // Attempts to add to the vehicles array
  add(vehicle) {
    // If adding something that is not a vehicle return an error message
    if (!(vehicle instanceof Vehicle)) {
      return "Only vehicles are allowed in here!";
    }
    // If garage is at capacity return error message
    if (this.vehicles.length === this.capacity) {
      return "Sorry, we're full.";
    }
    // Add vehicle to the vehciles array, return success message
    this.vehicles.push(vehicle);
    return "Vehicle added!";
  }
}
