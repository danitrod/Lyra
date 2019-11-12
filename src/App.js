import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form'
import Lyrics from './components/Lyrics/Lyrics'
import WatsonImg from './images/watson.png'

function App() {

  const initialState = {
    lyrics: "The lyrics will appear here!",
    emotions: "The analysis will appear here!"
  }

  const [state, setState] = useState(initialState)

  const onQueryClickHandler = (artist, song) => {
    fetch('/lyrics', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist,
        song
      })
    })
      .then(res => {
        return res.json()
      }).then(data => {
        if (data.err === true) {
          console.log(data.msg)
        }
        else {
          console.log(data.lyrics)
          setState({ lyrics: data.lyrics, emotions: data.emotions })
        }
      })
      .catch(err => {
        console.error(err)
      })
    // this.setState({ songValue: "", artistValue: "" })
  }

  return (
    <div className="App">
      <Form query={(artist, song) => onQueryClickHandler(artist, song)} />
      <Lyrics lyrics={state.lyrics} emotions={state.emotions} />
      <footer className={"Footer"}>
        <h3>Powered by Watson™</h3>
        <img src={WatsonImg} alt="watson logo" />
      </footer>
    </div>
  );
}

export default App;
