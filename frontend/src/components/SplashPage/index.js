
import Navigation from '../Navigation'
import SongPlayer from '../SongPlayer'
import ShowSongs from '../ShowSongs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllLikes } from '../../store/likes'
import { getAllGenres } from '../../store/genres'


const SplashPage = ({ isLoaded, hasSong, setSignIn, setSignUp }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLikes())
        dispatch(getAllGenres())
    }, [])

    return (
        <>
            <Navigation isLoaded={isLoaded} setSignIn={setSignIn} setSignUp={setSignUp} />
            <div className='outside-container'>
                <div className='discover-songs-container'>
                    <div className='splash-page-songs'>
                        <h1 className='splash-title'>Hear what’s trending for free in the SoundClout community</h1>
                        <ShowSongs genreFilter={'like'} />
                    </div>
                </div>
            </div>
            <SongPlayer hasSong={hasSong} />
        </>

    )

}

export default SplashPage