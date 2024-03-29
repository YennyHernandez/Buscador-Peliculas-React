import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { Movies} from './Components/movies.jsx'
import {useMovies} from './Hooks/useMovies.js'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '' //cuando el search sea vacio, isFirst va a ser true, cuando search cambie sera false
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error, isFirstInput}
}

function App() {  
  const [sort, setSort] = useState(false)
  const { search, setSearch, error, isFirstInput} = useSearch() 
  const {movies, getMovies} = useMovies({search,sort});

  const handleSort = () =>{
    setSort(!sort)
  }
  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 2000) 
    ,[getMovies]
  )
  const handleSubmit = (e) =>{
    e.preventDefault() //evita que se recargue la página al usar los forms
    getMovies();
  }
  const handleChangeSearch = (e) =>{
    const newSearch = e.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }
  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form action="" onSubmit={handleSubmit}>  
            <label> Ingrese pelicula que desea buscar</label>
            <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            value={search} 
            name='query'
            placeholder='Avengers,Start war, Barbie...'
            onChange={handleChangeSearch}/>
            <input type="checkbox" onChange={handleSort} checked= {sort} />
            <button >Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}         
        </header>
        <main>
          <Movies movies= {movies} isfirst ={ isFirstInput}></Movies>
        </main>
      </div>
    </>
  )
}

export default App
