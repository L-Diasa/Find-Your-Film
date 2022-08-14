import React, { useContext } from "react"
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'
import { Context } from "../Context"

export default function Details() {
    const { darkMode } = useContext(Context)
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
