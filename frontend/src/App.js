import React from 'react';

import NotFound from './Components/NotFound.jsx';

import SignUp from './Components/SignUp.jsx';
import Login from './Components/Login';

import Home from './Components/Home';
import AllArticle from './Components/AllArticle';
import Search from './Components/Search';
import MyProfile from './Components/MyProfile';
import MyProfileEdit from './Components/MyProfileEdit';
import MyProfileEditPassword from './Components/MyProfileEditPassword';
import DeleteProfile from './Components/DeleteProfile';
import Deconnect from './Components/Deconnect';


import Sorry from './Components/Sorry';
import Bye from './Components/Bye';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignUp} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/application/home' component={Home} />
        <Route exact path='/application/allArticle' component={AllArticle} />
        <Route exact path='/application/search' component={Search} />
        <Route exact path='/application/myProfile' component={MyProfile} />
        <Route exact path='/application/myProfile/edit' component={MyProfileEdit} />
        <Route exact path='/application/myProfile/editPassword' component={MyProfileEditPassword} />
        <Route exact path='/application/myProfile/deleteIt' component={DeleteProfile} />
        <Route exact path='/application/deconnect' component={Deconnect} />


        <Route exact path='/sorry' component={Sorry} />
        <Route exact path='/bye' component={Bye} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
