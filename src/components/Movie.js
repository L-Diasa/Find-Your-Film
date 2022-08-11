import React, { useState, useEffect, useContext, useMemo } from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"
import addIcon from "../images/addIcon.png"
import removeIcon from "../images/removeIcon.png"

export default function Movie({ id }) {
    const [movieDetails, setMovieDetails] = useState([])
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const { 
        isInWatchlistChecker, 
        addToWatchlist, 
        removeFromWatchlist
        } = useContext(Context)

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=a662712626815555702f1c6320550397&language=en-US`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMovieDetails(data))

        setIsInWatchlist(isInWatchlistChecker(id))
    }, [])

    function watchlistIcon() {
        if(isInWatchlist) {
            return <img 
                        src={removeIcon} 
                        alt="" 
                        onClick={() => {
                            setIsInWatchlist(false)
                            removeFromWatchlist(id)
                        }}
                    />
        } 
        return <img 
                    src={addIcon} 
                    alt="" 
                    onClick={() => {
                        addToWatchlist(id)
                        setIsInWatchlist(true)
                    }}
                />
    }

    return useMemo(() => {
        return (
            <div className="movie">
                <img className="image" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="" />
                <div className="title">{movieDetails.original_title}</div>
                {/* <div className="star"></div> */}
                {/* <div className="minutes"></div> */}
                <div className="genres">
                    {movieDetails.genres ? 
                    movieDetails.genres.map(genre => genre.name).join(", ") 
                    : ""}
                </div>
                <div className="text">{movieDetails.overview}</div>
                <div className="watchlist">{watchlistIcon()}</div>
                <Link 
                    to="/Details"
                    state={{ movieId: id }}
                >
                    learn more
                </Link>
            </div>
        )
    }, [isInWatchlist, movieDetails])
}
