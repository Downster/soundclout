import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SongContainerTop from "./SongContainerTop"
import { useEffect, useState } from "react"
import Comment from "./Comment"
import { addSelectedSong } from '../../store/selectedSong'
import { clearLoadedComments, getComments } from '../../store/comments'
import './individualSong.css'
import CommentCard from "./CommentCard"
import { getSongs } from "../../store/songs"


const IndividualSong = ({ sessionUser, setShowEdit, showEdit }) => {
    const likes = useSelector(state => state.likes)
    const dispatch = useDispatch();
    const { songId } = useParams()
    const [commentsLoaded, setCommentsLoaded] = useState(false)
    const song = useSelector(state => state.songs[songId])
    const comments = useSelector(state => state.comments)
    const totalComments = (Object.keys(comments).length)
    let totalLikes;
    if (likes[songId]) {
        totalLikes = (Object.keys(likes[songId]).length)
    } else {
        totalLikes = 0
    }

    useEffect(() => {
        (async () => {
            const com = await dispatch(getComments(songId))
            setCommentsLoaded(com)
        })()
        dispatch(addSelectedSong(song))
        dispatch(getSongs())
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
                                    <p className="total-comments">{(totalLikes === 1) ? totalLikes + " like" : totalLikes + ' likes'}</p>
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