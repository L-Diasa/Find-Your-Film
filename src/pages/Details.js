import React from "react"
import { useLocation } from 'react-router-dom'

import { Header, HeaderLinkSearch, HeaderLinkWatchlist } from '../components/Header'

export default function Details() {
    const location = useLocation()
    const { movieId } = location.state

    return (
        <>
            <Header 
                pageTitle="My Watchlist" 
                link={
                    <div className="details-header-links">
                        <HeaderLinkSearch />
                        <HeaderLinkWatchlist />
                    </div>
                } 
            />
            <div>Details</div>
            <div>{movieId}</div>
            <div></div>
        </>
    )
}
