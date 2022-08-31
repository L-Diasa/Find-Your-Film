const express = require('express')
const path = require('path')
const axios = require('axios')
require('dotenv').config()

const PORT = Number(process.env.PORT || 3001)

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/genrelist", (req, res) => {
  const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
  }

  axios.request(options).then((response) => {
      res.json(response.data)
  }).catch((error) => {
    return res.json(400)
  })
})

app.get("/moviebyid", (req, res) => {
  const id = req.query.movieid
  const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
  }

  axios.request(options).then((response) => {
      res.json(response.data)
  }).catch((error) => {
    res.json(400)
  })
})

app.get("/movieCarousel", (req, res) => {
  const type = req.query.carouselType
  const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
  }

  axios.request(options).then((response) => {
      res.json(response.data)
  }).catch((error) => {
    res.json(400)
  })
})

app.get("/searchwithquery", (req, res) => {
  const query = req.query.query
  const pages = req.query.pages
  const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${pages}&query=${query}`
  }

  axios.request(options).then((response) => {
      res.json(response.data)
  }).catch((error) => {
    res.json(400)
  })
})

app.get("/searchwithgenre", (req, res) => {
  const genre = req.query.genre
  const pages = req.query.pages
  const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${pages}&with_genres=${genre}`
  }

  axios.request(options).then((response) => {
      res.json(response.data)
  }).catch((error) => {
    res.status(400)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT)