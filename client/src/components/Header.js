import React, { useMemo, useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { AuthContext } from '../context/AuthContext'

export default function Header( { handleClick } ) {
    const { darkMode, toggleDarkMode, watchlistItems } = useContext(AppContext)
    const { logout } = useContext(AuthContext)
    const onLogout = () => {
        logout();
    }

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
                    <Link 
                        to="/Auth"
                        onClick={onLogout}
                        className="header-link log-out-button" 
                    >
                        Log out
                    </Link>
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