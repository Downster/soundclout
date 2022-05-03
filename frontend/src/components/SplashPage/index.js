
import { useState } from 'react'
import Navigation from '../Navigation'
import ShowSongs from '../ShowSongs'
import SongPlayer from '../SongPlayer'


const SplashPage = ({ isLoaded, hasSong, setSignIn, setSignUp }) => {

    return (
        <>
            <Navigation isLoaded={isLoaded} setSignIn={setSignIn} setSignUp={setSignUp} />
            <h1>Hear what’s trending for free in the SoundClout community</h1>
            <div className='splash-page-songs'>
                <ShowSongs />

            </div>
            <SongPlayer hasSong={hasSong} />
        </>

    )

}

export default SplashPage