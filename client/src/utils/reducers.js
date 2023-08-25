import { LOGIN, LOGOUT } from "./actions";

export const reducer = (state, {type, payload}) => {
  switch(type){
    case LOGIN: 
      if(payload.token.length >= 0){
        return {
          ...state,
          loggedIn: true,
          user: {...payload.user},
          token: payload.token
        };
      }
      return state;
    case LOGOUT: 
      return {
        ...state,
        loggedIn: false,
        user: {},
        token: ''
      };
    default:
      return state;
  }
};