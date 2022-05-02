const SELECT_SONG = 'selectedSong/SELECT_SONG'
const DESELECT_SONG = 'selectedSong/DESELECT_SONG'
const TRACK_TIME = 'selectedSong/TRACK_TIME'

const selectSong = (song) => ({
    type: SELECT_SONG,
    song
})

const trackTime = (time) => ({
    type: TRACK_TIME,
    time
})

const deselectSong = () => ({
    type: DESELECT_SONG,
})

export const addSelectedSong = (song) => async (dispatch) => {
    dispatch(selectSong(song))
}

export const removeSong = () => async (dispatch) => {
    dispatch(deselectSong())
}

export const updateSongTime = (time) => async (dispatch) => {
    dispatch(trackTime(time))
}

const initialState = {
};

const selectedSongReducer = (state = initialState, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case SELECT_SONG:
            nextState['song'] = action.song
            return nextState
        case DESELECT_SONG:
            const emptyState = {}
            return emptyState
        case TRACK_TIME:
            nextState['time'] = action.time
            return nextState
        default:
            return state;
    }
}

export default selectedSongReducer;