import React, { useMemo, useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"

export default function Header( { handleClick } ) {
    const { darkMode, toggleDarkMode, watchlistItems } = useContext(Context)

    return useMemo(() => {
        return (
            <header>
                <Link 
                    to="/Finder" 
                    className="header-link"
                    onClick={handleClick}
                >
                    <h1 className="header-title">Find Your Film</h1>
                </Link>
                <div>
                    <div 
                        className={`toggler ${darkMode}`}
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
                    <Link 
                        to="/Watchlist" 
                        className="header-link watchlist" 
                    >
                        My Watchlist 
                        {   watchlistItems.length ? 
                            <span className="header-link-watchlist-num">
                                {watchlistItems.length}
                            </span> 
                            : 
                            ""
                        }
                    </Link>
                </div>
            </header>
        )
    }, [darkMode, watchlistItems])
}