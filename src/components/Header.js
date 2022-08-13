import React, { useMemo, useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"

function Header({ pageTitle, link }) {
    const { darkMode, toggleDarkMode } = useContext(Context)

    return useMemo(() => {
        return (
            <header>
                <h1 className="header-title">{pageTitle}</h1>
                <div>
                    <div 
                        className={`toggler ${darkMode ? "dark" : ""}`}
                    >
                        <p>Light</p>
                        <div 
                            className="toggler--slider"
                            onClick={toggleDarkMode}
                        >
                            <div className="toggler--slider--circle"></div>
                        </div>
                        <p>Dark</p>
                    </div>
                    {link}
                </div>
            </header>
        )
    }, [darkMode])
}

function HeaderLinkSearch() {
    return (
        <Link to="/Finder" className="header-link">Search for Movies</Link>
    )
}

function HeaderLinkWatchlist(props) {
    return (
        <Link to="/" className="header-link" onClick={props.handleClick}>My Watchlist</Link>
    )
}

export { Header, HeaderLinkWatchlist, HeaderLinkSearch }