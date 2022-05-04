import { useDispatch, useSelector } from "react-redux"
import { useEffect, } from "react"
import { getSongs } from "../../store/songs"
import SongCard from '../SongCard'
import './ShowSongs.css'
import { generatePath } from "react-router-dom"


const ShowSongs = ({ genreFilter }) => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)





    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])




    return (
        <>
            <div className="songs">
                {Object.values(songs).map((song) => {
                    if (genreFilter !== 'all' && song.genreId === genreFilter) {
                        return (
                            <SongCard song={song} />
                        )
                    } else if (genreFilter === 'all') {
                        return (
                            <SongCard song={song} />
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </>
    )
}

export default ShowSongs