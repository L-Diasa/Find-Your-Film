import React, { useState, useEffect, useContext, useMemo } from "react"
import { AppContext } from "../context/AppContext"

export default function Genre({ id, name, currSelected, handleNavigation }) {
    const [isSelectedGenre, setIsSelectedGenre] = useState(false)
    const { 
        isInGenreSelection, 
        addToGenreSelection, 
        removeFromGenreSelection,
        darkMode
        } = useContext(AppContext)

    useEffect(() => {
        setIsSelectedGenre(isInGenreSelection(id))
    }, [currSelected])

    function handleClick() {
        handleNavigation()
        if(isInGenreSelection(id)) {
            removeFromGenreSelection(id)
            setIsSelectedGenre(false)
        } else {
            addToGenreSelection(id)
            setIsSelectedGenre(true)
        }
    }

    return useMemo(() => {
        return (
            <button 
                onClick={handleClick}
                className={`finder-link ${darkMode}
                    ${(currSelected && isInGenreSelection(id)) ? 
                        "selected-finder-link" : ""}`}
            >
                {name}
            </button>

        )
    }, [isSelectedGenre, currSelected, darkMode ])
}
