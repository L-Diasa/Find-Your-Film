import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from './context/AuthContext'

import Details from "./pages/Details"
import Finder from "./pages/Finder"
import Watchlist from "./pages/Watchlist"
import Auth from "./pages/Auth"

export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Routes>
        {user !== null ? 
        <>
          <Route exact path="/Watchlist" element={<Watchlist />}/>
          <Route exact path="/Details" element={<Details/>}/>
          <Route path="/Finder/*" element={<Finder/>}/>
          <Route path="/*" element={<Navigate to="/Finder"/>}/>
        </>
        : 
        <>
          <Route path="/*" element={<Navigate to="/Auth"/>}/>
          <Route path="/Auth" element={<Auth/>}/>
        </>
        }
      </Routes>
    </>
  )
}
