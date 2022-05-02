import { csrfFetch } from "./csrf";

const GET_LIKES = 'likes/GET_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE'
const REMOVE_LIKE = 'likes/REMOVE_LIKE'


const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const addLike = (like) => ({
    type: ADD_LIKE,
    like
})

const deleteLike = (like) => ({
    type: REMOVE_LIKE,
    like
})


export const getAllLikes = () => async (dispatch) => {
    const res = await csrfFetch('/api/likes')

    if (res.ok) {
        const likes = await res.json()
        console.log(likes)
        dispatch(getLikes(likes))
    }
}

export const addOneLike = (like) => async (dispatch) => {
    const res = await csrfFetch('/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(like)
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(addLike(like))
        return true
    } else {
        return false
    }

}

export const removeLike = (likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(deleteLike(like))
        return true
    } else {
        return false
    }
}
const initialState = {
};
const likesReducer = (state = initialState, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case GET_LIKES:
            action.likes.forEach((like) => {
                if (!nextState[like.songId]) {
                    nextState[like.songId] = {}
                }
                nextState[like.songId][like.userId] = like
            })
            return nextState
        case ADD_LIKE:
            if (!nextState[action.like.songId]) {
                nextState[action.like.songId] = {}
            }
            nextState[action.like.songId][action.like.userId] = action.like
            return nextState
        case REMOVE_LIKE:
            delete nextState[action.like.songId][action.like.userId]
            return nextState
        default:
            return state
    }
}

export default likesReducer;