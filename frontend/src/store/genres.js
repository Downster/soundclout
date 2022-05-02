import { csrfFetch } from "./csrf";

const GET_GENRES = 'genres/GET_GENRES'

const getGenres = (genres) => ({
    type: GET_GENRES,
    genres
})

export const getAllGenres = () => async (dispatch) => {
    const res = await csrfFetch('/api/genres')

    if (res.ok) {
        const genres = await res.json()
        dispatch(getGenres(genres))
    }
}

const initialState = {
}
const genresReducer = (state = initialState, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case GET_GENRES:
            console.log(action)
            action.genres.forEach(genre => {
                nextState[genre.id] = genre
            });
            return nextState
        default:
            return state
    }
}

export default genresReducer