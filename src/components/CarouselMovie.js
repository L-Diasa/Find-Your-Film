import React from "react"
import { Link } from "react-router-dom"

export default function CarouselMovie({ id, poster_path }) {

    return (
        <>
            <Link 
                to="/Details"
                state={{ movieId: id }}
            >
            <img className="carousel-movie-img" src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
            </Link>
        </>
    )
}