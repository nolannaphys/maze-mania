import './styles/Home.css';

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export default function Home(props){
  const { data, loading } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  return (
    <>
      Home
      { loading ? (
        <h2> Loading</h2>
      ): (
        <h2>{JSON.stringify(userData)}</h2>
      )}
    </>
  )
}