import datajson from '../mocks/result.json'
import { useRef, useState } from 'react'
import nodatamoviejson from '../mocks/noresult.json'

export function useMovies ({search}){
    const [responseMovie, setResponseMovie] = useState([])
    const previuSearch = useRef("")
    const movies = responseMovie.Search
    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))
    const getMovies=() =>{
        if(search === previuSearch.current)return
        if(search) {
            previuSearch.current = search
            // fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)  mejor forma de concatenar
            fetch("https://www.omdbapi.com/?apikey=4287ad07&s=" + search)
            .then(res => res.json())
            .then(json => {
                setResponseMovie(json)
            })
           
        }else{
            setResponseMovie(nodatamoviejson)
        }
    }
    return{mappedMovies,getMovies}
}