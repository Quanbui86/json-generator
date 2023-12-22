import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'

  // Element selectors
const [json, setJson] = useState('')
const [jsObject, setJsObject] = useState('')
const [movies, setMovies] = useState('')
// Text to populate button text on click
const getFilm = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  fetch(`https://api.themoviedb.org/3/search/movie?query=hero&include_adult=true&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      getrandomMovieInfo(response)
    })
    .catch(err => console.error(err));
}
function getrandomMovieInfo(response){
  const random = Math.floor(Math.random()*response.results.length)
  console.log(response.results[random])
  setMovies(JSON.stringify(response.results[random], null, 2))
}
const clickHandleFilm = () => {
  getFilm()
}

// Asynchronous function
const generateJson = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(response.ok){
      const jsonResponse = await response.json();
      setJsObject(jsonResponse)
      randomObject(jsonResponse)
    }
  } catch(error) {
    console.log(error);
  }
};
function randomObject(jsonResponse){
  const random = Math.floor(Math.random()*10)
  console.log(random)
  setJson(JSON.stringify(jsonResponse[random], null, 2))
}
const clickHandle = () => {
  generateJson()
}
useEffect(() => {
  if (jsObject) {
    console.log(jsObject)
    console.log(jsObject[1].address.street);
  }
}, [jsObject]);
// Format returned promise data

// Listen for click on button
//jsonButton.addEventListener('click', generateJson);
  return (
    <div className="App">
      <header className="App-header">
        <section className='container'>
          <input className='button' type='button' value='Generate' onClick={clickHandle}/>
          {json?<pre className='textArear' >{json}</pre>:''}
          <input className='button' type='button' value='Generate Film' onClick={clickHandleFilm}/>
          <pre className='display'>{movies}</pre>
        </section>
      </header>
    </div>
  );
}

export default App;
