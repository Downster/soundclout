const RESUME_SONG = "song_play/RESUME_SONG";
const PAUSE_SONG = "song_play/PAUSE_SONG";
const RECEIVE_PLAY_SONG = "song_play/RECEIVE_PLAY_SONG";
const CLEAR_SONG = "song_play/CLEAR_SONG";
const SET_DURATION = 'song_play/SET_DURATION'
const SET_SEEK = 'song/SET_SEEK'
const RESTART_SONG = 'song/RESTART_SONG'
const SET_REPEAT = 'song/SET_REPEAT'
const LOAD_SONG = 'song/LOAD_SONG'

export const resumeSong = () => ({
    type: RESUME_SONG
});

export const loadSong = (song, songId) => ({
    type: LOAD_SONG,
    song,
    songId
})

export const restartSong = () => ({
    type: RESTART_SONG
})

export const pauseSong = () => ({
    type: PAUSE_SONG
});

export const setRepeat = () => ({
    type: SET_REPEAT
})

export const receivePlaySong = (song, songId) => ({
    type: RECEIVE_PLAY_SONG,
    song,
    songId
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
    duration: null,
    songId: null,
    repeat: false,
};

const songPlayReducer = (state = initialState, action) => {
    Object.freeze(state)
    const nextState = { ...state };
    switch (action.type) {
        case LOAD_SONG:
            nextState.song = action.song
            nextState.songId = action.songId
            nextState.isPaused = true
            return nextState;
        case RECEIVE_PLAY_SONG:
            if (nextState.song) {
                nextState.song.stop()
            }
            nextState.song = action.song
            nextState.songId = action.songId
            nextState.song.play()
            nextState.isPlaying = true;
            return nextState;

        case RESUME_SONG:
            nextState.isPlaying = true;
            nextState.song.play()
            nextState.song.seek(nextState.seek)
            nextState.isPaused = false;
            return nextState;

        case PAUSE_SONG:
            nextState.isPlaying = false;
            nextState.song.pause()
            nextState.isPaused = true;
            nextState.seek = nextState.song.seek()
            return nextState;
        case RESTART_SONG:
            nextState.song.seek(0)
            return nextState
        case CLEAR_SONG:
            if (nextState.repeat === true) {
                nextState.song.seek(0)
                nextState.song.play()
                return nextState
            } else {
                return initialState;
            }
        case SET_DURATION:
            nextState.duration = action.duration
            return nextState
        case SET_SEEK:
            nextState.seek = action.seek
            nextState.song.seek(nextState.seek)
            return nextState
        case SET_REPEAT:
            nextState.repeat = !nextState.repeat
            return nextState
        default:
            return state;
    };
};

export default songPlayReducer;