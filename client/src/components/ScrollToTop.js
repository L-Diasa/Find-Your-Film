import React, { useState, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"

export default function ScrollToTop() {
    const [showButton, setShowBtn] = useState(false)
    const { darkMode } = useContext(AppContext)

    function checkY() {
        if (window.scrollY > 500) {
            setShowBtn(true);
        } else {
            setShowBtn(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkY);
        return() => {
            window.removeEventListener('scroll', checkY)
        }
    }, [])

    return(
        <button 
            onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
            className={`scrollToTop ${darkMode} ${showButton ? "" : "hidden"}`}
        >   
            ❯
        </button>
    )
}


    