import React, { useState, useContext, useRef, useMemo, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"

import Header from '../components/Header'
import GenreCarousel from '../components/GenreCarousel'
import MovieCarousel from '../components/MovieCarousel'
import Category from '../components/Category'
import StartExploring from '../components/StartExploring'
import ScrollToTop from '../components/ScrollToTop'
import { Context } from "../Context"
import searchIcon from "../images/searchIcon.svg"

function Finder() {
    const [currSelection, setCurrSelection] = useState("")
    const [query, setQuery] = useState("")
    const { genreSelection, 
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
        clearGenreSelection()
        setCurrSelection("")
    }, [])

    function handleSearch(e) {
        e.preventDefault()
        searchInputRef.current.focus()
        navigate("/Finder/search")
        clearGenreSelection()
    }

    function getLinkClass(selected) {
        return selected ? "selected-finder-link" : ""
    }

    return useMemo(() => {
        return (
            <div className={`page ${darkMode}`}>
                <Header />
                
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
                        
                    <ScrollToTop />

                    <GenreCarousel 
                        currSelected={
                            currSelection === "genre"
                        }
                        handleNavigation={() => {
                            navigate("/Finder/genre")
                            setCurrSelection("genre")
                            setQuery("")
                        }}
                    />
                    
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <>
                                    <MovieCarousel type="popular" />
                                    <MovieCarousel type="upcoming" />
                                </>
                            }
                        />
                        <Route  exact 
                                path="search" 
                                element={
                                    query ? 
                                    <Category query={query}/>
                                    :
                                    <StartExploring />
                                } /> 
                        <Route  exact
                                path="genre" 
                                element={
                                    genreSelection.length ? 
                                    <Category genre={genreSelection.join(',')} />
                                    :
                                    <StartExploring />
                                }/>    
                    </Routes>
                </main>
            </div>
        )
    }, [currSelection, query, genreSelection, darkMode ])
}

export default Finder