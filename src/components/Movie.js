import React, { useState, useEffect, useContext, useMemo } from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"

import starIcon from "../images/starIcon.svg"
import addIcon from "../images/addIcon.svg"
import removeIcon from "../images/removeIcon.svg"
import viewDetailsIcon from "../images/viewDetailsIcon.svg"

export default function Movie({ id }) {
    const [movieDetails, setMovieDetails] = useState(null)
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
            return <div
                    onClick={() => {
                            setIsInWatchlist(false)
                            removeFromWatchlist(id)
                        }
                    }
                    className="movie-watchlist-content"
                    >
                    <img 
                        src={removeIcon} 
                        alt="remove" 
                    />Watchlist
                </div>
        } 
        return <div
                onClick={() => {
                        addToWatchlist(id)
                        setIsInWatchlist(true)
                    }
                }
                className="movie-watchlist-content"
                >
                    <img 
                        src={addIcon} 
                        alt="add" 
                    />Watchlist
                </div>
    }

    return useMemo(() => {
        return (
            <>
            { movieDetails && 
            <div className="movie">
                <img 
                    className="movie-image" 
                    alt=""
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
                 />
                <div className="movie-title">{movieDetails.title}</div>
                <div className="movie-star"><img src={starIcon} alt="stars:" />8</div>
                <div className="movie-details">
                    <span >127 min</span>
                    {movieDetails.genres ? 
                    movieDetails.genres.map(genre => genre.name).join(", ") 
                    : ""}
                </div>
                <div className="movie-overview">{movieDetails.overview}</div>
                <div className="movie-watchlist">{watchlistIcon()}</div>
                <Link 
                    to="/Details"
                    state={{ movieId: id }}
                    className="movie-more"
                >
                    <img src={viewDetailsIcon} alt="" />
                    More
                </Link>
            </div>
        }
        </>
        )
    }, [isInWatchlist, movieDetails])
}
