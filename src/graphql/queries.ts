import { gql } from "@apollo/client";

const GET_CHARACTER = gql`
  query GetCharacter ($id: ID!) {
    character (id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
        id
      }
      location {
        name
        dimension
        id
      }
      image
    }
  }
`

const GET_LOCATION = gql`
  query GetLocation ($id: ID!) {
    location (id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`

const GET_LOCATION_COUNT = gql`
  query {
    locations {
      info {
        count
      }
    }
  }
`

export {
  GET_LOCATION,
  GET_CHARACTER,
  GET_LOCATION_COUNT
}