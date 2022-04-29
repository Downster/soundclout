import { Howl } from 'howler'

const PLAY_SONG = "song_play/PLAY_SONG";
const PAUSE_SONG = "song_play/PAUSE_SONG";
const RECEIVE_PLAY_SONG = "song_play/RECEIVE_PLAY_SONG";
const CLEAR_SONG = "song_play/CLEAR_SONG";
const SET_DURATION = 'song_play/SET_DURATION'
const SET_SEEK = 'song/SET_SEEK'

export const playSong = () => ({
    type: PLAY_SONG
});

export const pauseSong = () => ({
    type: PAUSE_SONG
});

export const receivePlaySong = (song) => ({
    type: RECEIVE_PLAY_SONG,
    song
});

export const clearSong = () => ({
    type: CLEAR_SONG
})



export const setDuration = (duration) => ({
    type: SET_DURATION,
    duration
})

export const setSeek = (seek) => ({
    type: SET_SEEK,
    seek
})

const initialState = {
    song: null,
    isPlaying: false,
    seek: null,
    isPaused: false,
    duration: null
};

const songPlayReducer = (state = initialState, action) => {
    Object.freeze(state)
    const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_PLAY_SONG:
            nextState.song = action.song
            if (nextState.isPaused) {
                nextState.song.play()
                nextState.song.seek(nextState.seek)
                nextState.isPaused = false;
            } else {
                nextState.song.play()
            }
            nextState.isPlaying = true;
            return nextState;

        case PLAY_SONG:
            nextState.isPlaying = true;
            nextState.isPaused = false;
            return nextState;

        case PAUSE_SONG:
            nextState.isPlaying = false;
            nextState.song.pause()
            nextState.isPaused = true;
            nextState.seek = nextState.song.seek()
            return nextState;

        case CLEAR_SONG:
            return initialState;
        case SET_DURATION:
            nextState.duration = action.duration
            return nextState
        case SET_SEEK:
            nextState.seek = action.seek
            nextState.song.seek(nextState.seek)
            return nextState
        default:
            return state;
    };
};

export default songPlayReducer;