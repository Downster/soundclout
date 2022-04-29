import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UploadSong from "./components/UploadSong";
import ShowSongs from "./components/ShowSongs"
import SongPlayer from './components/SongPlayer'
import IndividualSong from './components/IndividualSong'
import './reset.css'
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSong, setHasSong] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path='/songs/:songId'>
            <IndividualSong />
          </Route>
          <Route path='/'>
            {sessionUser && (
              <UploadSong sessionUser={sessionUser} options={'upload'} />
            )}
            <ShowSongs />
            <SongPlayer hasSong={hasSong} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;