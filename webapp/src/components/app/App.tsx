import React from 'react';
import './App.css';
import Board from '../board/Board';
import Login from './../login/Login';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const App: React.FC = () => {
  return (
    <UserContext.Provider value={{username:'', token:'' }}>
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/board" component={Board} />
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
