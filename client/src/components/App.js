import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SideMenu from './SideMenu';
import Content from './Content';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Router>
        <SideMenu />
        <Route paths={["/ReleaseRequests", "/AllQuarantinedEmails"]} component={Content} />
      </Router>
    );
  }
}

export default App;