import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Report from 'Pages/reportai';


class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/report" component={Report} />
        </Switch>
      </Router>
    )
  }
}


export default Routes;
