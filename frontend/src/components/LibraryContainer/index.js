import ShowSongs from "../ShowSongs"
import DeveloperComponent from "../DeveloperComponent"

const LibraryContainer = ({ sessionUser }) => {
    return (
        <>
            <div className="outside-container">
                <div className="discover-songs-container">
                    <div className="stream-songs">
                        <ShowSongs genreFilter={'userLikes'} sessionUser={sessionUser} />
                    </div>
                </div>
                <DeveloperComponent />
            </div>
        </>
    )
}

export default LibraryContainer