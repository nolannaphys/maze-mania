import { useState } from 'react'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

import LoginProvider from './utils/LoginContext';
import Auth from './utils/auth';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [count, setCount] = useState(0)
  // get token, if null, empty string will be the token
  const token = Auth.getToken() || '';
  // want to set the proper state from the beginning if we are initially logged in
  const loggedIn = token.length > 0;
  // declared apollo provider here, so we cannot run queries in this App component
  // We create a LoginCheck component to do that work for us.
  console.log(token);

  return (
    <ApolloProvider client={client}>
      <LoginProvider token={token} loggedIn={loggedIn}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </LoginProvider>
      {/* <LoginForm />
      <Message />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </ApolloProvider>
  )
}

export default App
