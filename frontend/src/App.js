import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EditSongForm from "./components/Modals/editSong";
import ShowSongs from "./components/ShowSongs"
import SongPlayer from './components/SongPlayer'
import IndividualSong from './components/IndividualSong'
import './reset.css'
import './index.css'
import EditOrUploadSong from "./components/UploadSongForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSong, setHasSong] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>

      {showEdit && <EditSongForm sessionUser={sessionUser} setShowEdit={setShowEdit} />}
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
            <IndividualSong sessionUser={sessionUser} setShowEdit={setShowEdit} showEdit={showEdit} />
          </Route>
          <Route path='/'>
            {sessionUser && (
              <EditOrUploadSong sessionUser={sessionUser} options={'upload'} />
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