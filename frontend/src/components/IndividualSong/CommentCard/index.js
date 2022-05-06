import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { editCurrentComment, removeComment } from "../../../store/comments"
import { formatTime } from "../../../utils/formatTime"
import './commentCard.css'

const CommentCard = ({ sessionUser, comment }) => {
    const dispatch = useDispatch();
    const [canEdit, setCanEdit] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [placeHolder, setPlaceholder] = useState('')
    const [editText, setEditText] = useState(comment.body)

    useEffect(() => {
        if (sessionUser && sessionUser.id === comment.userId) {
            setCanEdit(true)
        }


    }, [])

    const edit = async (e) => {
        e.preventDefault()
        const newComment = {
            id: comment.id,
            body: editText
        }
        const errors = await dispatch(editCurrentComment(newComment))
        if (errors) {
            setPlaceholder(errors.errors[1])
            setEditText('')
        } else {
            setIsEditing(false)
        }
    }

    const deleteComment = (e) => {
        const { id } = comment;
        dispatch(removeComment(id))
    }


    return (
        <>
            {comment &&
                <div className="individual-comment">
                    <div className="flex-container">
                        <img className="comment-image" width='40' height='40' src={comment.User.imageUrl} />
                        <div className="comment-inners">
                            <h1 className="comment-text">{comment.User.username} at {formatTime(comment.time)}</h1>
                            {(isEditing) ? <form onSubmit={(e) => edit(e)}><input className='comment-edit' placeholder={placeHolder} type='text' value={editText} onChange={(e) => setEditText(e.target.value)}></input></form> : < h1 > {comment.body}</h1>}
                        </div>
                    </div>
                    <div className='comment-actions'>
                        {canEdit && <button className='individual-edit' onClick={() => setIsEditing(!isEditing)} >
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                        </button>}
                        {canEdit && <button className='individual-edit' onClick={() => deleteComment()}>
                            <i className="fa-solid fa-trash"></i>
                            Delete
                        </button>}
                    </div>
                </div>
            }
        </>
    )
}

export default CommentCard