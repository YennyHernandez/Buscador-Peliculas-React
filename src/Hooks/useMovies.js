import datajson from '../mocks/result.json'
//import nodatamoviejson from './noresult.json'
export function useMovies (){
    const movies = datajson.Search
    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))
    console.log("mapeado use es", mappedMovies)
    return{mappedMovies}
}