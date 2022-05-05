import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/LOAD_SONGS'
const RECEIVE_SONG = 'songs/RECEIVE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';


const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
})

const receiveSong = (song) => ({
    type: RECEIVE_SONG,
    song,
});

const editSong = (song) => ({
    type: EDIT_SONG,
    song
})

const remove = (songId) => ({
    type: DELETE_SONG,
    songId
})

export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs', {
        method: 'GET',
    })

    if (res.ok) {
        const songs = await res.json()
        dispatch(loadSongs(songs))
    } else {
        //error handling here
    }
}

export const deleteSong = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(remove(songId))
    }

}





export const edit = (id, song) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })

    if (res.ok) {
        const song = await res.json()
        dispatch(editSong(song))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const createSong = (song) => async (dispatch) => {
    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    });

    if (res.ok) {
        const song = await res.json()
        dispatch(receiveSong(song))
    } else {
        const errors = await res.json()
        return errors
    }

}

const initialState = {
};

const songsReducer = (state = initialState, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case LOAD_SONGS:
            action.songs.forEach((song) => {
                nextState[song.id] = song
            })
            return nextState
        case EDIT_SONG:
            nextState[action.song.id] = action.song
            return nextState
        case RECEIVE_SONG:
            nextState[action.song.id] = action.song
            return nextState;
        case DELETE_SONG:
            delete nextState[action.songId]
            return nextState;
        default:
            return state;
    }
};

export default songsReducer;