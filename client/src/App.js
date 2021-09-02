import React, { Fragment, useEffect } from 'react';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Alert from './components/layout/Alert';
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>

  );
}

export default App;
