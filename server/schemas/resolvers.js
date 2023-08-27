const { Tech, Matchup, User } = require('../models');
const auth = require('../utils/auth');
const axios = require('axios');

require('dotenv').config();

const isLoggedIn = (context) => {
  if(context && context.hasOwnProperty('user') && context.user.hasOwnProperty('_id')){
    return true;
  }
  return false;
}

const resolvers = {
  Query: {
    test: async () => {
      return {
        message: "It's working! - Inna"
      }
    },
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
    me: async(parent, {}, context) => {
      if(!isLoggedIn(context)){
        throw new Error("Not logged in");
      }
      const id = context.user._id;
      // // used the below line to test my query
      // const id = "64e7b539604ce719595be0d3";
      let user = await User.findById(id);
      // if you need to modify output or want to only see plain data, use toObject function
      user = user.toObject();

      console.log(user);
      return user;
    },
    searchMovie: async (parent, { movie }) => {
      const response = await axios({
        method: 'get',
        url: `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie}`
      });
      console.log(response.data);
      return response.data;
    }
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    signUp: async (parent,{ name, email, password}, context) => {
      const user = await User.create({ name, email, password });
      // const token = auth.signToken(user);
      // return { token, user };
    },
    login: async (parent, {email, password}, context) => {
      // if email is not sent, this is an invalid request
      if(email){
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Error: No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new Error('Error: Incorrect credentials');
        }

        // const token = auth.signToken(user);
        // // console.log(auth.signToken);

        // return { token, user };
      }
      throw new Error('Error: No user found with this email address');
    },
  },
};

module.exports = resolvers;
