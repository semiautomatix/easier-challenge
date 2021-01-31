import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Grommet } from 'grommet';

// graphql client
import client from './graphql/client';

// pages
import Character from './pages/Character';
import Location from './pages/Location';

const routes = [
  { path: '/', name: 'Location', Component: Location },
  { path: '/character/:id', name: 'Character', Component: Character }
]

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Grommet plain>
          <div className="App">
            <Switch>
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  <Component />
                </Route>
              ))}
              <Route component={() => <Redirect from='*' to='/' />} />
            </Switch>
          </div>
        </Grommet>
      </Router>
    </ApolloProvider>
  );
}

export default App;
