import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Report from 'Pages/Report';
import Test from 'Pages/Test';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/report" component={Report} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
