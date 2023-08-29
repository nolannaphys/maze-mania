import { useState, useEffect } from "react";
import { MUTATION_SIGNUP } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth"

export default function SignUpForm (props) {
  const [formState, setFormState ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: ''
  });

  const [signUp, { error }] = useMutation(MUTATION_SIGNUP);

  const handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    setFormState({
      ...formState, // copy the old form state
      [name]: value // update the new value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    setShowError(false);
    setShowSuccess(false);



    try{
      const { data } = await signUp({
        variables: {
          ...formState
        }
      });
    Auth.login(data.signUp.token)

      console.log(data);
    //   console.log(data?.login.token)
    //   console.log(data?.login.user);
      setShowSuccess(true);
    //   setUserData(data?.login.user);
    }catch(err){
      console.error(err);
      setShowError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="email" 
        type="email" 
        placeholder="email@dot.com" 
        value={formState.email}
        onChange={handleChange}
      />
      <input 
        name="password" 
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      { showError ? (
        <h4 style={{color: "red"}}>
          Wrong password!
        </h4>
      ) : (
        <></>
      )}
      { showSuccess ? (
        <h4 style={{color: "green"}}>
          Good Login! Hello, {userData.name}!
        </h4>
      ) : (
        <></>
      )}
    </form>
  )
}