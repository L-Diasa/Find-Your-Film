
import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"

import noDataIcon_light from "../images/noDataIcon_light.svg"
import noDataIcon_dark from "../images/noDataIcon_dark.svg"

export default function StartExploring() {
    const { darkMode } = useContext(AppContext)

    return(
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
    )
}