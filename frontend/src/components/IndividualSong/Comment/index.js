import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteSong } from "../../../store/songs"
import { removeSong } from "../../../store/selectedSong"
import { useHistory } from "react-router-dom"
import { createComment } from "../../../store/comments"
import { useSelector } from "react-redux"
import { removeLike } from "../../../store/likes"

const Comment = ({ sessionUser, song, setShowEdit, showEdit }) => {
    const history = useHistory()
    const [comment, setComment] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const dispatch = useDispatch()
    const time = useSelector(state => state.selectedSong.time)
    const likes = useSelector(state => state.likes[song.id])

    useEffect(() => {
        if (likes && likes[sessionUser.id]) {
            setIsLiked(true)
        }
        if (sessionUser.id === song.userId) {
            setCanEdit(true)
        }
    }, [])

    const submitComment = (e) => {
        console.log(time)
        e.preventDefault()
        const newComment = {
            userId: sessionUser.id,
            songId: song.id,
            body: comment,
            time
        }
        dispatch(createComment(newComment))
    }

    const remove = () => {
        dispatch(deleteSong(song.id))
        dispatch(removeSong())
        history.push('/')
    }

    const submitLike = () => {

    }

    const undoLike = () => {
        const done = dispatch(removeLike(likes[sessionUser.id].id))
        if (done) {
            setIsLiked(false)
        }
    }

    return (
        <>
            {likes &&
                <div className="comment-form">
                    <img className="user-image" src={(sessionUser) ? sessionUser.imageUrl : 'https://imgur.com/hdrdJxY.jpg'} />
                    <form onSubmit={(e) => submitComment(e)}>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Write a comment'
                        >
                        </input>
                    </form>
                    <button onClick={(isLiked) ? undoLike : submitLike}>
                        <i className={(isLiked) ? "fa-solid fa-heart liked" : "fa-solid fa-heart"}></i>
                        {(isLiked) ? 'Liked' : 'Like'}
                    </button>
                    {canEdit &&
                        <button onClick={() => setShowEdit(!showEdit)}>
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                        </button>
                    }
                    <button onClick={remove}>
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            }
        </>
    )
}

export default Comment