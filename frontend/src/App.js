import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignUpFormPage from "./components/SignUpFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EditSongModal from "./components/EditSongModal";
import ShowSongs from "./components/ShowSongs"
import SongPlayer from './components/SongPlayer'
import IndividualSong from './components/IndividualSong'
import './reset.css'
import './index.css'
import EditOrUploadSong from "./components/UploadSongForm";
import SplashPage from "./components/SplashPage";
import SignupFormModal from "./components/SignUpFormModal";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSong, setHasSong] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showSignIn, setSignIn] = useState(false)
  const [showSignUp, setSignUp] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>

      {showEdit && <EditSongModal sessionUser={sessionUser} setShowEdit={setShowEdit} />}
      {showSignIn && <LoginFormModal setSignIn={setSignIn} />}
      {showSignUp && <SignupFormModal setSignUp={setSignUp} />}
      {isLoaded && (

        <Switch>
          <Route exact path='/'>
            {(sessionUser) ? <Redirect to='/discover' /> : <SplashPage isLoaded={isLoaded} hasSong={hasSong} setSignIn={setSignIn} setSignUp={setSignUp} />}
          </Route>
          <Route path='/upload'>
            <Navigation isLoaded={isLoaded} />
            {(sessionUser) ?
              <EditOrUploadSong sessionUser={sessionUser} options={'upload'} /> : <h1>Please login</h1>
            }
          </Route>
          <Route path='/songs/:songId'>
            <Navigation isLoaded={isLoaded} />
            <IndividualSong sessionUser={sessionUser} setShowEdit={setShowEdit} showEdit={showEdit} />
          </Route>
          <Route path='/discover'>
            <Navigation isLoaded={isLoaded} />
            <ShowSongs />
            <SongPlayer hasSong={hasSong} />
          </Route>
          <Route path='/about'>
            <Navigation isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;