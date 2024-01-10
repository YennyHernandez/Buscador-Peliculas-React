import { useState, useRef } from 'react'
import './App.css'
import { Movies} from './Components/movies.jsx'
import {useMovies} from './Hooks/useMovies.js'

function App() {
  const [titulomovie, setTituloMovie] = useState("")
  //const [dataMovie, setDataMovieJson] = useState([])
  const{mappedMovies} = useMovies();
  console.log(mappedMovies, "mapeado")
  const bandera = useRef(true) 
 // let URL = "https://www.omdbapi.com/?apikey=4287ad07&s=" + titulomovie

  const sendata = () =>{
/*       event.preventDefault();
      fetch(URL) //ya viene en json la respuesta
      .then(res => (
        res.json,
         console.log("la res es", res))
      ) 
      
      .then(data => setDataMovieJson(data)) */

  }
  const changetitulo = (e) =>{
    setTituloMovie(e.target.value)
    bandera.current = true
  }
  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form action="">
            <label> Ingrese pelicula que desea buscar</label>
            <input placeholder='Avengers,Start war, Barbie...'
            onChange={changetitulo}/>
            <button onClick={sendata}>Buscar</button>
          </form>         
        </header>
        <main>
          <Movies movies= {mappedMovies}></Movies>
        </main>
      </div>
    </>
  )
}

export default App
