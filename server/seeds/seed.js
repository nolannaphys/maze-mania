const db = require('../config/connection');
const { Tech, User } = require('../models');
const cleanDB = require('./cleanDB');

const techData = require('./techData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('Tech', 'teches');
  await cleanDB('User', 'users');

  await Tech.insertMany(techData);

  // a hook was created in the user model to hash the passwords
  await User.insertMany(userData);

  console.log('Technologies seeded!');
  process.exit(0);
});
