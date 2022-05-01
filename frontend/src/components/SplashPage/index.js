
import { useState } from 'react'
import Navigation from '../Navigation'
import ShowSongs from '../ShowSongs'
import SongPlayer from '../SongPlayer'


const SplashPage = ({ isLoaded, hasSong, setSignIn, setSignUp }) => {

    return (
        <>
            <Navigation isLoaded={isLoaded} setSignIn={setSignIn} setSignUp={setSignUp} />
            <h1></h1>
            <ShowSongs />
            <SongPlayer hasSong={hasSong} />
        </>

    )

}

export default SplashPage