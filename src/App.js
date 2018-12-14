import React, { Component } from 'react';
import './App.css';
import Home from './components/home';
import About from './components/about';
import ChangePermission from './components/changePermission';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/change-permission" exact component={ChangePermission} ></Route>
            <Route path="/about" component={About} ></Route>
            <Route path="/" exact component={Home} ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
