import React, { Fragment } from 'react';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Alert from './components/layout/Alert';
import Register from "./components/auth/Register";
import store from './store';
import { Provider } from 'react-redux';

function App() {
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
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>

  );
}

export default App;
