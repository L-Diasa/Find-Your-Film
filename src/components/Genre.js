import React, { useState, useEffect, useContext, useMemo } from "react"
import { Context } from "../Context"

export default function Genre({ id, name, currSelected, handleNavigation}) {
    const [isSelectedGenre, setIsSelectedGenre] = useState(false)
    const { 
        isInGenreSelection, 
        addToGenreSelection, 
        removeFromGenreSelection
        } = useContext(Context)

    useEffect(() => {
        setIsSelectedGenre(isInGenreSelection(id))
    }, [currSelected])

    function handleClick() {
        if(isSelectedGenre) {
            removeFromGenreSelection(id)
            setIsSelectedGenre(false)
        } else {
            addToGenreSelection(id)
            setIsSelectedGenre(true)
        }
        handleNavigation()
    }

    return useMemo(() => {
        return (
            <button 
                onClick={handleClick}
                className={`finder-link 
                    ${(currSelected && isSelectedGenre) ? 
                        "selected-finder-link" : ""}`}
            >
                {name}
            </button>

        )
    }, [isSelectedGenre, currSelected])
}
