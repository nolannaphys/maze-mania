import { useQuery } from "@apollo/client";

import {QUERY_MESSAGE} from '../utils/queries';

function Message(props){
  const { loading, data } = useQuery(QUERY_MESSAGE);

  const messageFromBack = data?.test || { message: "Not working" };

  return (
    <section className="message">
      { loading ? (
        <h1> loading </h1>
      ) : (
        <h1>{messageFromBack.message}</h1>
      )}
    </section>
  )
}

export default Message;