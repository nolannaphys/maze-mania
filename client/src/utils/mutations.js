import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      name
    }
  }
}
`;

export const MUTATION_SIGNUP = gql`
mutation signUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    token
    user {
      _id
      email
      name
    }
  }
}
`;