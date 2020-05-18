import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import './App.css';
import Register from './containers/Register';
import MarksForm from './containers/FillMarks';
import Header from './components/Headers/Header';
import Dashboard from './containers/Dashboard';
import Signin from './containers/Login';
import Profile from './containers/Profile';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className="App">         
      <Header/>
      <Drawer/>
      <Router>
        <Switch>
         
          <Route path="/register" component={Register}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/marksform" component={MarksForm}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/profile" component={Profile}/>
          <Redirect from ="/" to="/register"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
