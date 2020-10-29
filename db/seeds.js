const db = require("../models");

const status = ["Infected", "Previously Infected", "Not Infected"];

const bloodType = ["A-", "A+", "B-", "B+", "O-", "O+", "AB+", "AB-"];

const gender = [null, "Male", "Female", "Non-Binary"];

const ageGroup = ["3 - 18", "19 - 30", "30 - 55", "55+"];

const locationArray = [
  { country: "United States", state: "Texas", city: "Austin" },
  { country: "United States", state: "New York", city: "New York City" },
  { country: "United States", state: "California", city: "Los Angeles" },
  { country: "United States", state: "California", city: "San Francisco" },
];

const limit = 1000;

console.log("Starting Creation of Fake Users");

for (let i = 0; i < limit; i++) {
  const location = locationArray[between(0, locationArray.length)];

  const person = {
    status: status[between(0, status.length - 1)],
    bloodType: bloodType[between(0, status.length - 1)],
    gender: gender[between(0, gender.length - 1)],
    age: ageGroup[between(0, ageGroup.length - 1)],
    country: location.country,
    state: location.state,
    city: location.city,
  };

  db.Person.create(person);
}

console.log("Finished Creating Fake Users");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
