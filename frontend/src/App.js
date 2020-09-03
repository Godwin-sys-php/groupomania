import React from 'react';

import NotFound from './Components/NotFound.jsx';

import SignUp from './Components/SignUp.jsx';
import Login from './Components/Login';

import AllArticle from './Components/AllArticle';
import NewArticle from './Components/NewArticle';
import MyProfile from './Components/MyProfile';
import MyProfileEdit from './Components/MyProfileEdit';
import MyProfileEditPassword from './Components/MyProfileEditPassword';
import DeleteProfile from './Components/DeleteProfile';

import ViewArticle from './Components/ViewArticle';
import EditArticle from './Components/EditArticle';
import EditComment from './Components/EditComment';
import Profile from './Components/Profile';

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
        <Route exact path='/application/allArticle' component={AllArticle} />
        <Route exact path='/application/newArticle' component={NewArticle} />
        <Route exact path='/application/myProfile' component={MyProfile} />
        <Route exact path='/application/myProfile/edit' component={MyProfileEdit} />
        <Route exact path='/application/myProfile/editPassword' component={MyProfileEditPassword} />
        <Route exact path='/application/myProfile/deleteIt' component={DeleteProfile} />

        <Route exact path='/application/article/:idArticle' component={ViewArticle} />
        <Route path='/application/article/:idArticle/edit' component={EditArticle} />
        <Route path='/application/comment/:idComment/edit' component={EditComment} />
        <Route path='/application/profile/:idUser' component={Profile} />

        <Route exact path='/sorry' component={Sorry} />
        <Route exact path='/bye' component={Bye} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
