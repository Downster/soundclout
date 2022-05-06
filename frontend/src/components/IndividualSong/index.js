import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SongContainerTop from "./SongContainerTop"
import { useEffect, useState } from "react"
import Comment from "./Comment"
import { addSelectedSong } from '../../store/selectedSong'
import { clearLoadedComments, getComments } from '../../store/comments'
import './individualSong.css'
import ArtistCard from "./ArtistCard"
import CommentCard from "./CommentCard"


const IndividualSong = ({ sessionUser, setShowEdit, showEdit }) => {
    const dispatch = useDispatch();
    const { songId } = useParams()
    const [commentsLoaded, setCommentsLoaded] = useState(false)
    const song = useSelector(state => state.songs[songId])
    const comments = useSelector(state => state.comments)
    const totalComments = (Object.keys(comments).length)

    useEffect(() => {
        (async () => {
            const com = await dispatch(getComments(songId))
            setCommentsLoaded(com)
        })()
        dispatch(addSelectedSong(song))
        return () => {
            dispatch(clearLoadedComments())
        }
    }, [dispatch])


    return (
        <>
            <div className="outside-container-show">

                {song &&
                    < div className="individual-song-container-detail">
                        {commentsLoaded &&
                            <SongContainerTop sessionUser={sessionUser} song={song} comments={comments} />
                        }
                        <div className="song-bottom">

                            <div className="comment-about">
                                <Comment sessionUser={sessionUser} song={song} setShowEdit={setShowEdit} showEdit={showEdit} />
                                <div className="comment-right">
                                    <p className="total-comments">{(totalComments === 1) ? totalComments + " comment" : totalComments + ' comments'}</p>
                                </div>
                                <div className="comments">
                                    {comments && Object.values(comments).map((comment) => {
                                        return < CommentCard sessionUser={sessionUser} comment={comment} />
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default IndividualSong