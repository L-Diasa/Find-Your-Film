import React, { useContext } from "react"
import Carousel from "react-elastic-carousel"
import { Context } from "../Context"
import Genre from "./Genre"

export default function GenreCarousel({ currSelected, handleNavigation }) {
    const { genres, darkMode } = useContext(Context)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 300, itemsToShow: 2 },
        { width: 500, itemsToShow: 3 },
        { width: 700, itemsToShow: 4 },
        { width: 900, itemsToShow: 5 },
        { width: 1100, itemsToShow: 6 },
        { width: 1400, itemsToShow: 7 }
    ]

    const genreLinks = genres.map( genre => 
        <Genre 
            key={genre.id}
            name={genre.name}
            id={genre.id}
            currSelected={currSelected}
            handleNavigation={handleNavigation}
        />)

    return (
        <div className={`carousel ${darkMode}`}>
            <Carousel breakPoints={breakPoints}>
                {genreLinks}
            </Carousel>
        </div>
    )
}