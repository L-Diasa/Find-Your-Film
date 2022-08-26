import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [genres, setgenres] = useState(null)
    const [genreSelection, setGenreSelection] = useState([])
    const [watchlistItems, setWatchlisItems] = useState([])
    const [lastRemovedId, setLastRemovedId] = useState(null)
    const [darkMode, setDarkMode] = useState("dark")

    useEffect(() => {
        const url = `http://localhost:3001/genrelist`
        fetch(url)
        .then(res => res.json())
        .then(data => setgenres(data.genres))
        .catch(() => {
            setgenres(null)
        })
    }, [])

    function toggleDarkMode() {
        setDarkMode(prevMode => prevMode ? "" : "dark")
    }

    function addToGenreSelection(newItemId) {
        setGenreSelection(prevItems => [...prevItems, newItemId])
    }

    function isInGenreSelection(itemId) {
        return genreSelection.some(item => item === itemId)
    }

    function clearGenreSelection() {
        setGenreSelection([])
    }

    function removeFromGenreSelection(oldItemId) {
        setGenreSelection(prevItems => prevItems.filter(id => id !== oldItemId))
    }

    function addToWatchlist(newItemId) {
        if(!isInWatchlistChecker(newItemId)) {
            setWatchlisItems(prevItems => [newItemId, ...prevItems])
        }
    }

    function isInWatchlistChecker(itemId) {
        return watchlistItems.some(item => item === itemId)
    }

    function removeFromWatchlist(oldItemId) {
        setWatchlisItems(prevItems => prevItems.filter(id => id !== oldItemId))
        setLastRemovedId(oldItemId)
    }
    
    return (
        <Context.Provider 
            value={{
                genres, 
                genreSelection,
                isInGenreSelection, 
                addToGenreSelection, 
                removeFromGenreSelection,
                clearGenreSelection,
                watchlistItems,
                isInWatchlistChecker,
                addToWatchlist,
                removeFromWatchlist,
                lastRemovedId,
                toggleDarkMode,
                darkMode
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
