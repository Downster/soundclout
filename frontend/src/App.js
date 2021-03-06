import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import DeveloperComponent from "./components/DeveloperComponent";
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
import { getAllLikes } from './store/likes'
import { getAllGenres } from "./store/genres";
import { getUserLikes } from "./store/userLikes";
import LibraryContainer from "./components/LibraryContainer";
import AboutComponent from "./components/AboutComponent";


function App() {
  const isPlaying = useSelector(state => state.currentSong.isPlaying)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSong, setHasSong] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showSignIn, setSignIn] = useState(false)
  const [showSignUp, setSignUp] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id

  useEffect(() => {
    if (isPlaying) {
      setHasSong(true)
    }
  }, [isPlaying])
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllLikes())
    dispatch(getAllGenres())
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserLikes(userId))
    }
  }, [dispatch, sessionUser, userId])




  return (
    <>

      {showEdit && <EditSongModal sessionUser={sessionUser} setShowEdit={setShowEdit} />}
      {showSignIn && <LoginFormModal setSignIn={setSignIn} />}
      {showSignUp && <SignupFormModal setSignUp={setSignUp} />}

      <Switch>
        <Route exact path='/'>
          {(sessionUser) ? <Redirect to='/discover' /> : <SplashPage isLoaded={isLoaded} hasSong={hasSong} setSignIn={setSignIn} setSignUp={setSignUp} />}
          <SongPlayer hasSong={hasSong} />
        </Route>
        <Route path='/upload'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          {(sessionUser) ?
            <EditOrUploadSong sessionUser={sessionUser} options={'upload'} /> : <LoginFormModal setSignIn={setSignIn} uploadDenied={true} />
          }
          <SongPlayer hasSong={hasSong} />
        </Route>
        <Route path='/songs/:songId'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          <IndividualSong sessionUser={sessionUser} setShowEdit={setShowEdit} showEdit={showEdit} />
          <SongPlayer hasSong={true} />
        </Route>
        <Route path='/discover'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          <div className="outside-container">
            <div className="discover-songs-container">
              <div className="discover-songs">
                <ShowSongs genreFilter={14} />
                <ShowSongs genreFilter={13} />
                <ShowSongs genreFilter={5} />
              </div>
            </div>
            <DeveloperComponent />
          </div>
          <SongPlayer hasSong={hasSong} />
        </Route>
        <Route path='/about'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          <div className="outside-container-about">
            <div className="discover-songs-container">
              <div className="discover-songs">
                <AboutComponent />
              </div>
            </div>
          </div>
        </Route>
        <Route path='/stream'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          <div className="outside-container">
            <div className="discover-songs-container">
              <div className="stream-songs">
                <ShowSongs genreFilter={'all'} />
              </div>
            </div>
            <DeveloperComponent />
          </div>
          <SongPlayer hasSong={hasSong} />
        </Route>
        <Route path='/library'>
          <Navigation setSignIn={setSignIn} setSignUp={setSignUp} />
          {(sessionUser) ? <LibraryContainer setSignIn={setSignIn} setSignUp={setSignUp} sessionUser={sessionUser} /> : <LoginFormModal setSignIn={setSignIn} uploadDenied={true} />}
        </Route>
        <Route path=''>
          <h2>Page Not found</h2>
        </Route>
      </Switch>

    </>
  );
}

export default App;