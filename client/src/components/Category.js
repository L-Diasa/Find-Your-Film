import React, { useState, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Movie from "./Movie"
import axios from 'axios'

function Category(props) {
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
    }, [props])

    function handelNotOk() {
        if(pages === 1) {
            setUnableToFind(true)
        } else {
            setHasMorePages(false)
        }
    }

    const getMovies = async () => {
        if(props.query || props.genre) {
            const options = {
                method: 'GET',
                url: props.query ? 
                    `/searchwithquery` :
                    `/searchwithgenre`,
                params: props.query ? 
                {
                    pages: pages,
                    query: props.query
                } 
                    :
                { 
                    pages: pages,
                    genre: props.genre
                }
            }
            axios.request(options)
            .then(res => res.data)
            .then(data => data.results)
            .then(results => {
                if(results.length) {
                    setMovieList(prevMovies => 
                        pages === 1 ?
                            results : 
                            [...prevMovies, 
                            ...results]
                    )
                } else {
                    handelNotOk()
                }
            })
            .catch(() => handelNotOk())
        } else {
            handelNotOk()
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
