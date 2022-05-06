import { csrfFetch } from "./csrf"

const GET_USER_LIKES = 'userLikes/GET_USER_LIKES'
const CLEAR_USER_LIKES = 'userLikes/CLEAR_USER_LIKES'

const getLikes = (likes) => ({
    type: GET_USER_LIKES,
    likes
})

const clearLike = (songId) => ({
    type: CLEAR_USER_LIKES,
    songId
})

export const clearUserLike = (songId) => async (dispatch) => {
    dispatch(clearLike(songId))
}




export const getUserLikes = (userId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/${userId}`)

    if (res.ok) {
        const likes = await res.json()
        dispatch(getLikes(likes))
    }
    // }
}

const initialState = {
};

const userLikesReducer = (state = initialState, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case GET_USER_LIKES:
            if (action.likes) {
                action.likes.forEach((like) => {
                    nextState[like.songId] = like
                })
            }
            return nextState
        case CLEAR_USER_LIKES:
            console.log(action.songId)
            delete nextState[action.songId]
            return nextState
        default:
            return state
    }
}

export default userLikesReducer