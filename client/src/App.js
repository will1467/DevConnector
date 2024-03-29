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
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  })
  
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
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:id" component={Profile}/>

          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/posts" component={Posts}/>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>


        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>

  );
}

export default App;
