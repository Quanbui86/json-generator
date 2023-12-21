import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Element selectors
const [json, setJson] = useState('')
const [jsObject, setJsObject] = useState('')

// Text to populate button text on click

// Asynchronous function
const generateJson = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(response.ok){
      const jsonResponse = await response.json();
      // Kiểm tra định dạng của jsonResponse, là 1 array có 10 phần tử là object
      
      // Gán json là giá trị của jsonResponse dưới định dạng JSON 
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
          {json?<pre className='textArear' >{json}</pre>:''}
          <input className='button' type='button' value='Generate' onClick={clickHandle}/>
        </section>
        
      </header>
    </div>
  );
}

export default App;
