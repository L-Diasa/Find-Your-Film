import React from 'react'
import {Routes, Route} from "react-router-dom"

import Details from "./pages/Details"
import Finder from "./pages/Finder"
import Watchlist from "./pages/Watchlist"

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Watchlist />}/>
        <Route exact path="/Details" element={<Details/>}/>
        <Route path="/Finder/*" element={<Finder />}/>
      </Routes>
    </div>
  )
}
