import React, { useState, useEffect, useContext, useMemo } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from 'axios'

import starIcon from "../images/starIcon.svg"
import addIcon_light from "../images/addIcon_light.svg"
import addIcon_dark from "../images/addIcon_dark.svg"
import removeIcon_light from "../images/removeIcon_light.svg"
import removeIcon_dark from "../images/removeIcon_dark.svg"
import viewDetailsIcon_light from "../images/viewDetailsIcon_light.svg"
import viewDetailsIcon_dark from "../images/viewDetailsIcon_dark.svg"

export default function Movie({ id }) {
    const [movieDetails, setMovieDetails] = useState(null)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const { 
        isInWatchlistChecker, 
        addToWatchlist, 
        removeFromWatchlist,
        darkMode
        } = useContext(AppContext)

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `/moviebyid`,
            params: {movieid: id}
        }
        axios.request(options)
        .then(res => setMovieDetails(res.data))
        .then(() => {
            
        })
        .catch(() => setMovieDetails(null))
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
                        src={darkMode ? 
                            removeIcon_light :
                            removeIcon_dark} 
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
                        src={darkMode ? 
                            addIcon_light :
                            addIcon_dark}
                        alt="add" 
                    />Watchlist
                </div>
    }

    return useMemo(() => {
        return (
            <>
            { movieDetails && 
            <div className={`movie ${darkMode}`}>
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
                    <img src={darkMode ? 
                            viewDetailsIcon_light :
                            viewDetailsIcon_dark} alt="" />
                    More
                </Link>
            </div>
        }
        </>
        )
    }, [isInWatchlist, movieDetails, darkMode])
}
