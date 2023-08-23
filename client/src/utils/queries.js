import { gql } from '@apollo/client';

export const QUERY_MESSAGE = gql`
query Excellent {
  test {
    message
  }
}
`;