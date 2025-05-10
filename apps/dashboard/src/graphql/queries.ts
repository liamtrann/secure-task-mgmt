// GET_ORGANIZATIONS
import { gql } from '@apollo/client';

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
    }
  }
`;

// GET_USERS
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      role
      organization {
        id
        name
      }
    }
  }
`;

// CREATE_ORGANIZATION
export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($name: String!) {
    createOrganization(name: $name) {
      id
      name
    }
  }
`;

// CREATE_USER
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $role: Role!, $organizationId: String) {
    createUser(
      input: {
        name: $name
        email: $email
        role: $role
        organizationId: $organizationId
      }
    ) {
      id
      name
      email
      role
      organization {
        id
        name
      }
    }
  }
`;
