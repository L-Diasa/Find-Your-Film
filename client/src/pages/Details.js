import React, { useContext } from "react"
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'
import { AppContext } from "../context/AppContext"

export default function Details() {
    const { darkMode } = useContext(AppContext)
    const location = useLocation()
    const { movieId } = location.state

    return (
        <div className={`page ${darkMode}`}>
            <Header />
            <div>Details</div>
            <div>{movieId}</div>
            <div></div>
        </div>
    )
}
