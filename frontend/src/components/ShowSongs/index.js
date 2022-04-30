import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getSongs } from "../../store/songs"
import { Route, Link } from 'react-router-dom'
import { receivePlaySong, pauseSong, clearSong, setDuration } from "../../store/songPlay"
import { Howl } from 'howler'
import './ShowSong.css'

const ShowSongs = () => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)


    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    const playSong = (song) => {
        const sound = new Howl({
            src: song.url,
            html5: true,
            onend: function () {
                dispatch(clearSong())
            },
            onload: function () {
                dispatch(setDuration(sound._duration))
            }

        });
        dispatch(receivePlaySong(sound, song.id))
    }

    const pause = () => {
        dispatch(pauseSong())
    }


    return (
        <>
            {Object.values(songs).map((song) => {
                return (
                    <div key={song.id} className='song-container' >
                        <Link to={`/songs/${song.id}`}>
                            <img className='song-image' src={song.imageUrl} />
                        </Link>
                        <button className="play-song-button" onClick={() => playSong(song)}> Play</button>
                        <button className='pause-song-button' onClick={() => pause()}> Pause</button>
                    </div>
                )
            })}
        </>
    )
}

export default ShowSongs