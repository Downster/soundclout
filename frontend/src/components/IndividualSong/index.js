import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SongContainerTop from "./SongContainerTop"
import { useEffect } from "react"
import Comment from "./Comment"
import { addSelectedSong } from '../../store/selectedSong'
import { clearLoadedComments, getComments } from '../../store/comments'
import './individualSong.css'
import ArtistCard from "./ArtistCard"
import CommentCard from "./CommentCard"


const markersArray = new Set()
const IndividualSong = ({ sessionUser, setShowEdit, showEdit }) => {
    const dispatch = useDispatch();
    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId])
    const comments = useSelector(state => state.comments)
    const totalComments = (Object.keys(comments).length)

    useEffect(() => {
        dispatch(addSelectedSong(song))
        dispatch(getComments(songId))
        for (let comment in comments) {
            const userPic = comments[comment].User.imageUrl
            const commentTime = comments[comment].time
            let imageUrl = userPic
            let userImage = document.createElement('img');
            userImage.src = imageUrl
            userImage.width = 20
            userImage.height = 20
            userImage.style.zIndex = 100;
            const markerObj = {
                time: commentTime,
                markerElement: imageUrl
            }
            markersArray.add(JSON.stringify(markerObj))
        }

        return () => {
            dispatch(clearLoadedComments())
        }
    }, [dispatch])


    return (
        <>
            {song &&
                <div className="song-container">
                    <SongContainerTop sessionUser={sessionUser} song={song} markersArray={markersArray} />
                    <div className="comment-about">
                        <Comment sessionUser={sessionUser} song={song} setShowEdit={setShowEdit} showEdit={showEdit} />
                        <div className="artist-left">
                            <ArtistCard />
                        </div>
                        <div className="comment-right">
                            <p>{(totalComments === 1) ? totalComments + " comment" : totalComments + ' comments'}</p>
                        </div>
                        <div className="comments">
                            {comments && Object.values(comments).map((comment) => {
                                return < CommentCard sessionUser={sessionUser} comment={comment} />
                            })}
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default IndividualSong