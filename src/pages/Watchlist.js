import React, { useContext }from "react"

import Header from '../components/Header'
import Movie from '../components/Movie'
import { Context } from "../Context"

export default function Watchlist() {
    const { watchlistItems } = useContext(Context)

    const imageElements = watchlistItems.map(movieId => {
        return (<Movie 
                    key={movieId} 
                    id={movieId} 
                />)
    })

    return (
        <>
            <Header goTo="/Finder" pageTitle="My Watchlist" />
            <main>
                {imageElements.length ?
                    imageElements :
                    <div className="smthsUp">
                        Your watchlist is looking a little empty...
                    </div>
                }
            </main>
        </>
    )
}
