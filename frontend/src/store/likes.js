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

const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId
})


export const getUserLikes = (userID) => async (dispatch) => {
    const res = await csrfFetch('/api/likes')
}