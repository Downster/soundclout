import { csrfFetch } from "./csrf"

const GET_USER_LIKES = 'userLikes/GET_USER_LIKES'

const getLikes = (likes) => ({
    type: GET_USER_LIKES,
    likes
})



export const getUserLikes = (userId) => async (dispatch) => {
    // if (userId === undefined) {
    //     return;
    // } else {
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
            action.likes.forEach((like) => {
                nextState[like.songId] = like
            })
            return nextState
        default:
            return state
    }
}

export default userLikesReducer