import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteSong } from "../../../store/songs"
import { removeSong } from "../../../store/selectedSong"
import { useHistory } from "react-router-dom"
const Comment = ({ sessionUser, song, setShowEdit, showEdit }) => {
    const history = useHistory()
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const onSubmit = (e) => {
        //comment submit goes here
    }

    const remove = () => {
        dispatch(deleteSong(song.id))
        dispatch(removeSong())
        history.push('/')
    }

    return (
        <div className="comment-form">
            <img className="user-image" src={(sessionUser) ? sessionUser.imageUrl : 'https://imgur.com/hdrdJxY.jpg'} />
            <form>
                <input
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Write a comment'
                >
                </input>
            </form>
            <button>
                <i class="fa-solid fa-heart"></i>
                Like
            </button>
            <button onClick={() => setShowEdit(!showEdit)}>
                <i class="fa-solid fa-pencil"></i>
                Edit
            </button>
            <button onClick={remove}>
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </div>
    )
}

export default Comment