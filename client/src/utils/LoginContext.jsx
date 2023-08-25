import { createContext, useContext, useReducer } from 'react';

// Import our reducer
import { reducer } from './reducers';

// Create our login context using createContext()
export const LoginContext = createContext();

// Create a custom hook that allows easy access to our LoginContext values
export const useLogin = () => useContext(LoginContext);

// Creating our login provider. Accepts an argument of "props"
export default function LoginProvider(props) {
  const loggedIn = props.loggedIn ? props.loggedIn : false;
  const user = props.user ? props.user : {};
  const token = props.token ? props.token : '';

  // Set up our useReducer hook. Accepts two arguments - the reducer and an initial state
  const [state, dispatch] = useReducer(reducer, { user, loggedIn, token });
  // const [state, setState] = useState('');

  return (
    <LoginContext.Provider value={[state, dispatch]} {...props} >
      {/* allow us to see children under the provider */}
      {props.children}
    </LoginContext.Provider>
  );
}
