import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { editCurrentComment, removeComment } from "../../../store/comments"

const CommentCard = ({ sessionUser, comment }) => {
    const dispatch = useDispatch();
    const [canEdit, setCanEdit] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(comment.body)

    useEffect(() => {
        if (sessionUser.id === comment.userId) {
            setCanEdit(true)
        }


    }, [])

    const edit = (e) => {
        e.preventDefault()
        const newComment = {
            id: comment.id,
            body: editText
        }
        dispatch(editCurrentComment(newComment))
        setIsEditing(false)
    }

    const deleteComment = (e) => {
        const { id } = comment;
        dispatch(removeComment(id))
    }


    return (
        <>
            {comment &&
                <div className="individual-comment">
                    <img width='40' height='40' src={comment.User.imageUrl} />
                    <h1>{comment.User.username} at {comment.time}</h1>
                    {(isEditing) ? <form onSubmit={(e) => edit(e)}><input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}></input></form> : < h1 > {comment.body}</h1>}
                    <div className='comment-actions'>
                        {canEdit && <button onClick={() => setIsEditing(!isEditing)} >
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                        </button>}
                        {canEdit && <button onClick={() => deleteComment()}>
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