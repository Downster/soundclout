import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comments/LOAD_SONGS'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS'

const loadComment = (comments) => ({
    type: LOAD_COMMENTS,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

const clearComments = () => ({
    type: CLEAR_COMMENTS
})


export const getComments = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${songId}`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComment(comments))
    } else {
        console.log('error')
    }
}

export const clearLoadedComments = () => async (dispatch) => {
    dispatch(clearComments())
}

export const createComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const comment = await res.json()
        console.log(comment)
        dispatch(addComment(comment))
    }
}

export const editCurrentComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const comment = await res.json()
        console.log(comment)
        dispatch(editComment(comment))
    }

}



const initialState = {
};

const commentsReducer = (state = initialState, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach((comment) => {
                nextState[comment.id] = comment
            })
            return nextState
        case ADD_COMMENT:
            nextState[action.comment.id] = action.comment
            return nextState
        case EDIT_COMMENT:
            nextState[action.comment.id] = action.comment
            return nextState
        case CLEAR_COMMENTS:
            const clearedState = {}
            return clearedState
        default:
            return state;
    }
}

export default commentsReducer;