import { useDispatch, useSelector } from "react-redux"
import { useEffect, } from "react"
import { getSongs } from "../../store/songs"
import SongCard from '../SongCard'
import './ShowSongs.css'


const ShowSongs = () => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)




    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])




    return (
        <>
            <div className="songs">
                {Object.values(songs).map((song) => {
                    return (
                        <SongCard song={song} />
                    )
                })}
            </div>
        </>
    )
}

export default ShowSongs