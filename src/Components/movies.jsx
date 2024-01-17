function ListOfMovies ({ movies }) {
    return (
      <ul className='movies'>
        {
          movies.map(movie => (
            <li className='movie' key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title} />
            </li>
          ))
        }
      </ul>
    )
  }
  
  function NoMoviesResults (isFirst) {
    return (
      !isFirst.current
      ?<p>Debe realizar una busqueda</p>
      :<p>No se encontraron películas para esta búsqueda</p>
      
      
    )
  }
  
  export function Movies ({ movies }) {
    const hasMovies = movies?.length > 0
  
    return (
      hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
  }