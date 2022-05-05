import Navigation from "../Navigation"
import ShowSongs from "../ShowSongs"


const LibraryContainer = ({ sessionUser }) => {
    return (
        <>
            <div className="outside-container">
                <div className="discover-songs-container">
                    <div className="stream-songs">
                        <ShowSongs genreFilter={'userLikes'} sessionUser={sessionUser} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LibraryContainer