import './styles/Home.css';

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Nav from "../components/Nav";

export default function Home(props){
  const { data, loading } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  return (
    <>
      <Nav />
      <h1>Home</h1>
      {/* { data.loggedIn ? (
        <h2>{data.user.name}, you look good!</h2>
      ) : ( */}
        <h2>Please log in, I missed you!</h2>
      {/* )} */}
      {/* JSON.stringify(data, null, 2) --> the number 2 here signifies the number of indents with spaces */}
      {/* pre tag allows us to see the text with all line breaks and spacing */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </>
  )
}