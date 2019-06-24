import React from 'react';
import './App.css';
import Board from '../board/Board';
import Login from './../login/Login';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PrivateRoute from '../rotue/PrivateRoute';
import Homepage from '../home/Homepage';
import CreateProfile from '../profile/create/CreateProfile';
import { AuthenticationService } from '../../api/AuthenticationService';
import { NotificationContext } from '../context/NotificationContext';
import { ChatHubService } from '../../api/ChatHubService';

export default class App extends React.Component {

  render() {
    return (
      <div className="App container">
       <NotificationContext.Provider value={{ hub: new ChatHubService() }}>
          <UserContext.Provider value={{ username: '', token: '', authenticated: false }}>
            <UserContext.Consumer>
              {
                ctx =>
                  <Router>
                    <Switch>
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/profile/create' component={CreateProfile} />
                      <PrivateRoute exact path='/' context={ctx} component={Homepage} />
                      <PrivateRoute exact path='/home' context={ctx} component={Homepage} />
                      <PrivateRoute path='/board' context={ctx} component={Board} />
                    </Switch>
                  </Router>
              }
            </UserContext.Consumer>
          </UserContext.Provider>
        </NotificationContext.Provider>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.context.authenticated){
    const authenticationService = new AuthenticationService();
    authenticationService
      .logout(this.context.token, 'Browser tab closed.')
      .then(() => {
        this.context.token = null;
        this.context.username = null;
        this.context.authenticated = null;
      }
      )
      .catch(
        () => {
          this.context.token = null;
          this.context.username = null;
          this.context.authenticated = null;
        }
      );
    }
  }
}

App.contextType = UserContext;

interface IPorps {
}

interface IProps {
  history: string[];
}
