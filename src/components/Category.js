import React, { useState, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"
import Movie from "./Movie"

function Category(props) {
    let { type } = useParams()
    const [movieList, setMovieList] = useState([])
    const [hasMorePages, setHasMorePages] = useState(true)
    const [pages, setPages] = useState(1)

    const [unableToFind, setUnableToFind] = useState(false)

    useEffect(() => {
        getMovies()
    }, [pages])

    useEffect(() => {
        setMovieList([])
        setUnableToFind(false)
        setPages(1)
        getMovies()
    }, [type, props])

    function createUrl() {
        let key = "a662712626815555702f1c6320550397"
        if(type) {
            return `https://api.themoviedb.org/3/movie/${type}?api_key=${key}&language=en-US&page=${pages}`
        }
        if(props.query) {
            return `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=${pages}&query=${props.query}`
        } 
        if(props.genre) {
            console.log(props.genre)
            return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=${pages}&with_genres=${props.genre}`
        }
        return ""
    }

    function handelNotOk() {
        if(pages === 1) {
            setUnableToFind(true)
        } else {
            setHasMorePages(false)
        }
    }    

    const getMovies = async () => {
        const url = createUrl()
        if(!url) {
            handelNotOk()
        } else {
            const res = await fetch(url)
            if(!res.ok) {
                handelNotOk()
            } else {

            const data = await res.json()
            if(!data.results.length) {
                handelNotOk()
            }

            setMovieList(prevMovies => 
                pages === 1 ?
                    data.results : 
                    [...prevMovies, 
                    ...data.results]
                )
            }
        }
    }
    return useMemo(() => {
        return (
            <>
            {   unableToFind ? 
                <div className="smthsUp">
                    Unable to find what you’re looking for. Please try another search.
                </div> 
                :
                <InfiniteScroll
                    dataLength={movieList.length}
                    next={() => setPages(prevPage => prevPage + 1)}
                    hasMore={hasMorePages}
                    loader={<h4>Loading...</h4>}
                >
                    {movieList.map(
                        movie => {
                            return (<Movie 
                                        key={movie.id} 
                                        id={movie.id} 
                                    />)
                        }
                    )}
                </InfiniteScroll>
            }
            </>
        )
    }, [movieList, hasMorePages, unableToFind])
}

export default Category
