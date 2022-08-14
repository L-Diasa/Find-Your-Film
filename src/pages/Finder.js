import React, { useState, useContext, useRef, useMemo, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"

import { Header, HeaderLinkWatchlist } from '../components/Header'
import Genre from '../components/Genre'
import Category from '../components/Category'
import { Context } from "../Context"

import noDataIcon_light from "../images/noDataIcon_light.svg"
import noDataIcon_dark from "../images/noDataIcon_dark.svg"
import searchIcon from "../images/searchIcon.svg"

function Finder() {
    const [currSelection, setCurrSelection] = useState("")
    const [query, setQuery] = useState("")
    const { genres, 
            genreSelection, 
            clearGenreSelection,
            darkMode 
        } = useContext(Context)
    const searchInputRef = useRef(null)
    let navigate = useNavigate()

    useEffect(() => {
        if(currSelection !== "search" && query.length) {
            navigate("/Finder/search")
            clearGenreSelection()
            setCurrSelection("search")
        }
    }, [query])

    useEffect(() => {
        console.log("here")
        clearGenreSelection()
        setCurrSelection("")
    }, [])

    const genreLinks = genres.map( genre => 
        <Genre 
            key={genre.id}
            name={genre.name}
            id={genre.id}
            currSelected={
                currSelection === "genre"
            }
            handleNavigation={() => {
                navigate("/Finder/genre")
                setCurrSelection("genre")
                setQuery("")
            }
            }
        />
    )

    function handleSearch(e) {
        e.preventDefault()
        searchInputRef.current.focus()
        navigate("/Finder/search")
        clearGenreSelection()
    }

    function handleTypeClick() {
        setQuery("")
        clearGenreSelection()
    }

    function getLinkClass(selected) {
        return selected ? "selected-finder-link" : ""
    }

    return useMemo(() => {
        return (
            <div className={`page ${darkMode}`}>
                <Header 
                    pageTitle="Find Your Film" 
                    link={<HeaderLinkWatchlist />} 
                />
                <main>
                    <form onSubmit={(e) => handleSearch(e)}>
                        <img 
                            src={searchIcon} 
                            alt="" 
                            className="search-icon" />
                        <input 
                            ref={searchInputRef} 
                            type="text" 
                            name="query"
                            placeholder="Search for a movie"
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)}
                            className={`search-input ${darkMode}`}
                        /> 
                        <Link 
                            to={`/Finder/search`}
                            onClick={() => {
                                searchInputRef.current.focus()
                                setCurrSelection("search")
                                clearGenreSelection()
                            }}
                            className={`
                                search-link 
                                finder-link 
                                ${darkMode}
                                ${getLinkClass(currSelection === "search")}
                            `}
                        >
                            Search
                        </Link>
                    </form>
                    <div className="finder-category-links types">
                        <Link 
                            to={`/Finder/popular`} 
                            onClick={() => {
                                setCurrSelection("popular")
                                handleTypeClick()
                                }
                            }
                            className={`
                                finder-link 
                                ${darkMode}
                                ${getLinkClass(currSelection === "popular")}
                            `}
                        >
                            Popular
                        </Link>
                        <Link 
                            to={`/Finder/upcoming`} 
                            onClick={() => {
                                setCurrSelection("upcoming")
                                handleTypeClick()
                                }
                            }
                            className={`
                                finder-link 
                                ${darkMode}
                                ${getLinkClass(currSelection === "upcoming")}
                            `}
                        >
                            Upcoming
                        </Link>
                    </div>
                    <div className="finder-category-links">
                        {genreLinks}
                    </div>
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <div className={`smthsUp ${darkMode}`}>
                                    <img 
                                        src={darkMode ? 
                                            noDataIcon_dark :
                                            noDataIcon_light}
                                        alt=""
                                        className="no-data-icon"
                                    />
                                    Start exploring
                                </div> 
                            }
                        />
                        <Route  path=":type" 
                                element={<Category/>}/>
                        <Route  exact 
                                path="search" 
                                element={<Category query={query} />} /> 
                        <Route  exact
                                path="genre" 
                                element={<Category genre={genreSelection.join(',')}/>}/>    
                    </Routes>
                </main>
            </div>
        )
    }, [currSelection, query, genreSelection, darkMode])
}

export default Finder