import React from 'react';
import './App.css';
import Board from '../board/Board';
import Login from './../login/Login';
import {   Route,   Switch,  BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PrivateRoute from '../rotue/PrivateRoute';
import Homepage from '../home/Homepage';

export default class App extends React.Component {
  
  render() {
    return (
      <UserContext.Provider value={{username:'', token:'' }}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path='/' component={Homepage} isAuthenticated={this.context && this.context.token && this.context.token !== ''}/>
            <PrivateRoute path='/board' isAuthenticated={this.context && this.context.token && this.context.token !== ''} component={Board}/>
          </Switch>
        </Router>
      </div>
      </UserContext.Provider>
    );
  }
}

App.contextType = UserContext;

interface IProps {
  history : string[];
 }
