import React from "react"
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'

export default function Details() {
    const location = useLocation()
    const { movieId } = location.state

    return (
        <>
            <Header 
                goTo="fromDetails" 
                pageTitle="Movie Details" 
            />
            <div>Details</div>
            <div>{movieId}</div>
        </>
    )
}
