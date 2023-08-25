const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

// create schemas -> typeDef and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { contextTokenizer } = require('./utils/auth');
const db = require('./config/connection');


const PORT = process.env.PORT || 4445;
const app = express();


// ****** This is for apollo version 4 *****
// Please use apollo 4 version and associated auth file in order to use the latest Apollo
// Apollo plugin has been changed to use hooks in order to better control plugin access
// If you want to use version 3 from class, do not copy this code
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      // hooks into Apollo Context for request and values
      async requestDidStart(context) {
        // goes to contextTokenizer
        contextTokenizer(context);
      },
    },
  ],
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // installing apollo middleware affect all routes that start with graphql
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
