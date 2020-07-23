import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Nav/Navbar';
import Newfeed from './components/NewFeed/Newfeed';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Authenticate from './components/Authenticate/Authenticate';
import AllProfiles from './components/AllProfiles/AllProfiles'
import { Map, GoogleApiWrapper,InfoWindow, Marker } from "google-maps-react";
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify';


//Redux
import { Provider } from 'react-redux';
import store from '../src/store';
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import { StoreContext } from "./ThemeContext";
import LeftNav from './components/Nav/LeftNav';
import RightNav from './components/Nav/RightNav';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
export default function App() {
  let { navBarAppear } = React.useContext(StoreContext);

  React.useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ToastContainer></ToastContainer>

          {/* {navBarAppear[0] ? <RightNav></RightNav> : ""} */}
          {navBarAppear[0] ? <LeftNav></LeftNav> : ""}
          {navBarAppear[0] ? <Navbar></Navbar> : ""}
          <Switch>
            
            <Route exact path="/" component={AllProfiles}></Route>
            <Route exact path="/login" component={Authenticate}></Route>
            <PrivateRoute path="/newsfeed" component={Newfeed}></PrivateRoute>
            <PrivateRoute path="/profile/:id" component={Profile}></PrivateRoute>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            {/* <Route path="/dashboard" component={Dashboard}></Route> */}
          </Switch>

        </Fragment>
      </Router>
    </Provider>
  );
}


