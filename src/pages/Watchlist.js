import React, { useContext, useState, useEffect }from "react"

import Header from '../components/Header'
import Movie from '../components/Movie'
import { Context } from "../Context"

import ascendingIcon from "../images/ascendingIcon.svg"
import descendingIcon from "../images/descendingIcon.svg"

export default function Watchlist() {
    const { watchlistItems, lastRemovedId } = useContext(Context)

    const [sotredArray, setSortedArray] = useState(null)
    const [currSortOrder, setCurrSortOrder] = useState("asc")

    useEffect(() => {
        setSortedArray(
            watchlistItems.map(movieId => {
                return (<Movie 
                            key={movieId} 
                            id={movieId} 
                        />)
                }
            )
        )
    }, [])

    useEffect(() => {
        setSortedArray(prevArray => prevArray.filter(movieId => movieId.key != lastRemovedId))
    }, [lastRemovedId])

    function toggleDate() {
        setSortedArray(prevArray => [...prevArray].reverse())
        setCurrSortOrder(prev => prev === "asc" ? "desc" : "asc")
    }

    return (
        <>
            <Header goTo="/Finder" pageTitle="My Watchlist" />
            <main>
                <div className="watchlist-sorter selected-finder-link" onClick={toggleDate}>
                    Date Added<img src={currSortOrder === "asc" ? ascendingIcon : descendingIcon} alt="" />
                </div>
                {sotredArray ?
                    sotredArray :
                    <div className="smthsUp">
                        Your watchlist is looking a little empty...
                    </div>
                }
            </main>
        </>
    )
}
