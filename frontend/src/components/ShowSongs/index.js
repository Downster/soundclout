import { useDispatch, useSelector } from "react-redux"
import { useEffect, } from "react"
import { getSongs } from "../../store/songs"
import SongCard from '../SongCard'
import './ShowSongs.css'



const ShowSongs = ({ genreFilter, sessionUser }) => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)
    const genre = useSelector(state => state.genres)
    const likes = useSelector(state => state.likes)
    const userLikes = useSelector(state => state.userLikes)
    const userSongs = (Object.values(userLikes).map((song) => song.songId))
    const songIds = new Set()
    let currentGenre = null;
    if (genreFilter !== 'all' && genre) {
        currentGenre = genre[genreFilter]?.name
    }


    const generateMostLiked = () => {
        const likesArray = Object.values(likes)
        likesArray.sort((a, b) => {
            if (Object.values(a).length > Object.values(b).length) {
                return -1
            } else {
                return 1
            }
        })
        if (likesArray.length) {
            for (let i = 0; i < 8; i++) {
                const objArray = Object.entries(likesArray[i])
                for (let j = 0; j < objArray.length; j++) {
                    songIds.add(objArray[j][1].songId)
                }
            }
        }
    }
    generateMostLiked()







    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])




    return (
        <>
            <div className='songs-container'>
                {(currentGenre) ? <h1 className="container-title">Trending {currentGenre} songs </h1> : null}
                <div className={(genreFilter === 'like') ? 'songs-liked' : (genreFilter === 'all' || genreFilter === 'userLikes') ? 'songs-all' : 'songs'}>

                    {Object.values(songs).map((song) => {
                        if (genreFilter !== 'all' && song.genreId === genreFilter) {
                            return (
                                <>
                                    <SongCard key={song.id} song={song} />
                                </>
                            )
                        } else if (genreFilter === 'all') {
                            return (
                                <SongCard key={song.id} song={song} all={true} />
                            )
                        } else if (genreFilter === 'like' && songIds.has(song.id)) {
                            return (
                                <SongCard key={song.id} song={song} />
                            )
                        } else if (genreFilter === 'userLikes' && userSongs.includes(song.id)) {
                            return (
                                <SongCard key={song.id} song={song} />
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default ShowSongs