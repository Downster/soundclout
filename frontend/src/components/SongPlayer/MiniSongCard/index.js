import { useSelector } from "react-redux"

const MiniSongCard = ({ currentSongId }) => {
    const song = useSelector(state => state.songs[currentSongId])

    return (
        <div className="mini-song-card">
            <img className='mini-song-image' src={song?.imageUrl}></img>
        </div>
    )
}

export default MiniSongCard