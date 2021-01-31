import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Location from './pages/Location';
import { GET_LOCATION_COUNT, GET_LOCATION } from './graphql/queries';

const mocks = [
  {
    request: {
      query: GET_LOCATION_COUNT,
    },
    result: {
      data: {
        locations: {
          info: {
            count: 1
          }
        }
      },
    },
  },
  {
    request: {
      query: GET_LOCATION,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        location: {
          id: '1',
          name: 'Earth (C-137)',
          type: 'Planet',
          dimension: 'Dimension C-137',
          residents: [
            {
              id: '38',
              name: 'Beth Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg'
            },
          ],
        },
      },
    },
  },  
];

test('renders without error', async () => {
  render(<MockedProvider mocks={mocks} addTypename={false}>
    <App />
  </MockedProvider>);
  expect(screen.getByText('Loading ...')).toBeInTheDocument();
});

test('should render location and residents', async () => {
  render(<MockedProvider mocks={mocks} addTypename={false}>
    <Router>
      <Location />
    </Router>
  </MockedProvider>); 
  await waitFor(() => {
    expect(screen.getByText('Beth Smith')).toBeInTheDocument();
  });  
});
