import React from 'react';
import './App.css';
import Board from '../board/Board';
import Login from './../login/Login';
import { Route,   Switch,  BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PrivateRoute from '../rotue/PrivateRoute';
import Homepage from '../home/Homepage';

export default class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        
        <UserContext.Provider value={{username:'', token:'', authenticated: false }}>
          <UserContext.Consumer> 
          { 
            ctx =>  
            <Router>
            <Switch>
              <Route exact path='/login' component={Login}/>
              <PrivateRoute exact path='/' context={ ctx } component={Homepage} />
              <PrivateRoute path='/board'  context={ ctx } component={Board}/>
            </Switch>
            </Router>
          } 
          </UserContext.Consumer>
        </UserContext.Provider>
      </div>
      
    );
  }
}

App.contextType = UserContext;

interface IPorps {
}

interface IProps {
  history : string[];
 }
