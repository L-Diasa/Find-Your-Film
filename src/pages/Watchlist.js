import React, { useContext, useState, useEffect }from "react"
import { Link } from "react-router-dom"

import {Header, HeaderLinkSearch } from '../components/Header'
import Movie from '../components/Movie'
import { Context } from "../Context"

import ascendingIcon from "../images/ascendingIcon.svg"
import descendingIcon from "../images/descendingIcon.svg"
import addIcon from "../images/addIcon.svg"

export default function Watchlist() {
    const { watchlistItems, lastRemovedId } = useContext(Context)

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
        <>
            <Header pageTitle="My Watchlist" link={<HeaderLinkSearch />} />
            <main>            
                {sotredArray.length ?
                    <>
                    <div className="watchlist-sorter selected-finder-link" onClick={toggleDate}>
                        Date Added<img src={currSortOrder === "asc" ? ascendingIcon : descendingIcon} alt="" />
                    </div>
                    {sotredArray}
                    </>
                    :
                    <div className="smthsUp">
                        Your watchlist is looking a little empty...
                        <Link className="lets-add" to="/finder">
                            <img src={addIcon} alt="" />
                            Let’s add some movies!
                        </Link>
                    </div>
                }
            </main>
        </>
    )
}
