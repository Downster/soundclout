import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SongContainerTop from "./SongContainerTop"
import { useEffect } from "react"
import Comment from "./Comment"
import { addSelectedSong } from '../../store/selectedSong'
import './individualSong.css'

const IndividualSong = ({ sessionUser, setShowEdit, showEdit }) => {
    const dispatch = useDispatch();
    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId])

    useEffect(() => {
        dispatch(addSelectedSong(song))
    }, [dispatch])


    return (
        <>
            <div className="song-container">
                <SongContainerTop sessionUser={sessionUser} song={song} />
                <div className="comment-about">
                    <Comment sessionUser={sessionUser} song={song} setShowEdit={setShowEdit} showEdit={showEdit} />


                </div>
            </div>
        </>
    )
}

export default IndividualSong