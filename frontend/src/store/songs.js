import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/LOAD_SONGS'
const RECEIVE_SONG = 'songs/RECEIVE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';

const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
})

const receiveSong = (song) => ({
    type: RECEIVE_SONG,
    song
});

const editSong = (song) => ({
    type: EDIT_SONG,
    song
})

export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs', {
        method: 'GET',
    })

    if (res.ok) {
        const songs = await res.json()
        console.log(songs)
        dispatch(loadSongs(songs))
    } else {
        //error handling here
    }



}

export const edit = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'PATCH',
        body: ''
    })

}

export const createSong = (song) => async (dispatch) => {
    console.log('here')
    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        body: song
    });

    if (res.ok) {
        const song = await res.json()
        dispatch(receiveSong(song))
    } else {
        //error handling here
    }

}

const songsReducer = (state = {}, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case LOAD_SONGS:
            action.songs.forEach((song) => {
                nextState[song.id] = song
            })
            return nextState
        case RECEIVE_SONG:
            nextState[action.song.id] = action.song
            return nextState;
        // case REMOVE_TRACK:
        //     delete nextState[action.trackId]
        //     return nextState;
        default:
            return state;
    }
};

export default songsReducer;