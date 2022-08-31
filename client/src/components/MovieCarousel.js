import React, { useState, useEffect, useContext } from "react"
import Carousel from "react-elastic-carousel"
import CarouselMovie from "./CarouselMovie"
import { Context } from "../Context"
import axios from 'axios'

export default function MovieCarousel({ type }) {
    const [movieList, setMovieList] = useState(null)
    const { darkMode } = useContext(Context)
    
    const breakPoints =[
        { width: 1, itemsToShow: 1 },
        { width: 300, itemsToShow: 2 },
        { width: 500, itemsToShow: 3 },
        { width: 700, itemsToShow: 4 },
        { width: 900, itemsToShow: 5 },
        { width: 1000, itemsToShow: 6 },
        { width: 1200, itemsToShow: 7 },
        { width: 1400, itemsToShow: 8 }
    ]

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `/movieCarousel`,
            params: {carouselType: type}
        }
        axios.request(options)
        .then(res => setMovieList(
            res.data.results.map( movie => 
                <CarouselMovie
                    key={movie.id} 
                    id={movie.id} 
                    poster_path={movie.poster_path}
                /> 
        )))
        .catch(() => setMovieList(null))
    }, [])

    return (
        <>
        {   movieList && 
        <>
            <div className={`carousel-movie-title ${darkMode}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className={`carousel ${darkMode}`}>
                <Carousel breakPoints={breakPoints}>
                    {movieList}
                </Carousel>
            </div>
        </>
        }
        </>
    )
}