const {Users, Exercises, BodyDimensions} = require("../models");
const utils = require('../utils/utils');

// Define your seed data in JSON format
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user1@example.com',
    password: 'password1',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'user2@example.com',
    password: 'password2',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'user3@example.com',
    password: 'password3',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const exercises = [
  {
    userId: 1,
    name: "Running",
    description: "Morning jog in the park",
    duration: 30,
    time: "06:00",
    day: "Monday",
    date: "2024-05-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: "Weightlifting",
    description: "Strength training at the gym",
    duration: 60,
    time: "18:00",
    day: "Wednesday",
    date: "2024-05-22",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    name: "Cycling",
    description: "Road trip around the city",
    duration: 120,
    time: "08:00",
    day: "Friday",
    date: "2024-05-24",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    name: "Swimming",
    description: "Pool day with friends",
    duration: 60,
    time: "14:00",
    day: "Tuesday",
    date: "2024-05-21",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const bodyDimensions = [
  {
    userId: 1,
    weight: 150,
    height: 68,
    bicepSize: 12,
    thighSize: 20,
    bellySize: 32,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    weight: 180,
    height: 72,
    bicepSize: 14,
    thighSize: 22,
    bellySize: 36,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    weight: 120,
    height: 62,
    bicepSize: 10,
    thighSize: 18,
    bellySize: 28,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    weight: 110,
    height: 60,
    bicepSize: 8,
    thighSize: 16,
    bellySize: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


/** @type {import('umzug').MigrationFn<any>} */
exports.up = async params => {
  const hashedPasswords = await Promise.all(
    users.map(async user => {
      user.password = await utils.hashPassword(user.password);
      return user;
    })
  );
  await Users.bulkCreate(hashedPasswords);
  await Exercises.bulkCreate(exercises);
  await BodyDimensions.bulkCreate(bodyDimensions);
};

/** @type {import('umzug').MigrationFn<any>} */
exports.down = async params => {
  await Users.destroy({where: {id: [1, 2]}});
  await Exercises.destroy({where: {id: [1, 2]}});
  await BodyDimensions.destroy({where: {id: [1, 2]}});
};


