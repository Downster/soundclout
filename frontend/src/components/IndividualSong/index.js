import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SongContainerTop from "./SongContainerTop"
import { useEffect } from "react"
import Comment from "./Comment"
import { addSelectedSong } from '../../store/selectedSong'
import { clearLoadedComments, getComments } from '../../store/comments'
import './individualSong.css'
import ArtistCard from "./ArtistCard"

const IndividualSong = ({ sessionUser, setShowEdit, showEdit }) => {
    const dispatch = useDispatch();
    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId])
    const comments = useSelector(state => state.comments)
    const totalComments = (Object.keys(comments).length)

    useEffect(() => {
        dispatch(addSelectedSong(song))
        dispatch(getComments(songId))

        return () => {
            dispatch(clearLoadedComments())
        }
    }, [dispatch])


    return (
        <>
            <div className="song-container">
                <SongContainerTop sessionUser={sessionUser} song={song} />
                <div className="comment-about">
                    <Comment sessionUser={sessionUser} song={song} setShowEdit={setShowEdit} showEdit={showEdit} />
                    <div className="artist-left">
                        <ArtistCard />
                    </div>
                    <div className="comment-right">
                        <p>{(totalComments === 1) ? totalComments + " comment" : totalComments + ' comments'}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default IndividualSong