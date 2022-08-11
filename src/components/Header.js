import React, { memo } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function Header({ goTo, pageTitle }) {
    const detailsHeader = goTo === "fromDetails"

    return (
        <header>
            <h1>{pageTitle}</h1>
            <div>
                {detailsHeader &&
                <div className="details-header-links">
                    <Link to="/Finder" className="header-link">Search for movies</Link>
                    <Link to="/" className="header-link">My Watchlist</Link>
                </div>
                }
                {!detailsHeader &&
                    <Link to={goTo} className="header-link">
                        {
                        goTo === "/" 
                        ?
                        "My Watchlist"
                        : 
                        "Search for movies"
                        }
                    </Link>
                }
            </div>
        </header>
    )
}

export default memo(Header)

Header.propTypes = {
    goTo: PropTypes.string,
    pageTitle: PropTypes.string
}