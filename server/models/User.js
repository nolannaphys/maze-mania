const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Need a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});


// created pre-hook functions I could export for the purpose of testing
const hashPassword = async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
};

// created pre-hook functions I could export for the purpose of testing
const hashAllPasswords = async function (next, docs) {
  if(Array.isArray(docs) && docs.length) {
    const hashedUsers = docs.map( async (user) => {
      user.password = await bcrypt.hash(user.password, saltRounds);
      return user;
    });
    const users = await Promise.all(hashedUsers);
    next();
  }
  else{
    return next(new Error("User list should not be empty"));
  }

  next();
};

// set up pre-save middleware to create password
userSchema.pre('save', hashPassword);
userSchema.pre('insertMany', hashAllPasswords);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
