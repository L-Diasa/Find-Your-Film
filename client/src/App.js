import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"

import Details from "./pages/Details"
import Finder from "./pages/Finder"
import Watchlist from "./pages/Watchlist"

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/Watchlist" element={<Watchlist />}/>
        <Route exact path="/Details" element={<Details/>}/>
        <Route path="/Finder/*" element={<Finder />}/>
        <Route path="/*" element={<Navigate to="/Finder" />}/>
      </Routes>
    </>
  )
}
