import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import { AppContextProvider } from "./context/AppContext"
import { AuthContextProvider } from "./context/AuthContext"
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <AppContextProvider>
      <AuthContextProvider>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </AuthContextProvider>
    </AppContextProvider>
  </ApolloProvider>
)

