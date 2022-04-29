const SELECT_SONG = 'selectedSong/SELECT_SONG'
const DESELECT_SONG = 'selectedSong/DESELECT_SONG'

const selectSong = (song) => ({
    type: SELECT_SONG,
    song
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
        default:
            return state;
    }
}

export default selectedSongReducer;