import React, { useContext, useState, useEffect }from "react"
import { Link } from "react-router-dom"

import {Header, HeaderLinkSearch } from '../components/Header'
import Movie from '../components/Movie'
import { Context } from "../Context"

import ascendingIcon_light from "../images/ascendingIcon_light.svg"
import ascendingIcon_dark from "../images/ascendingIcon_dark.svg"
import descendingIcon_light from "../images/descendingIcon_light.svg"
import descendingIcon_dark from "../images/descendingIcon_dark.svg"
import addIcon_light from "../images/addIcon_light.svg"
import addIcon_dark from "../images/addIcon_dark.svg"

export default function Watchlist() {
    const { watchlistItems, lastRemovedId, darkMode } = useContext(Context)

    const [sotredArray, setSortedArray] = useState([])
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
        <div className={`page ${darkMode}`}>
            <Header pageTitle="My Watchlist" link={<HeaderLinkSearch />} />
            <main>            
                {sotredArray.length ?
                    <>
                    <div className={`watchlist-sorter selected-finder-link ${darkMode}`} onClick={toggleDate}>
                        Date Added
                        <img src={
                            currSortOrder === "asc" ? 
                            darkMode ? ascendingIcon_dark : ascendingIcon_light
                            : 
                            darkMode ? descendingIcon_dark : descendingIcon_light 
                            } alt="" 
                        />
                    </div>
                    {sotredArray}
                    </>
                    :
                    <div className={`smthsUp ${darkMode}`}>
                        Your watchlist is looking a little empty...
                        <Link className="lets-add" to="/finder">
                            <img src={darkMode ? 
                                    addIcon_light :
                                    addIcon_dark} alt="" />
                            Let’s add some movies!
                        </Link>
                    </div>
                }
            </main>
        </div>
    )
}
