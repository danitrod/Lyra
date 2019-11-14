import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Lyrics from './components/Lyrics/Lyrics';
import Loading from './components/Loading/Loading';
import WatsonImg from './images/watson.png';
import Error from './components/Error/Error';

function App() {

  const initialState = {
    loading: false,
    err: false,
    errMsg: "",
    // data: null
    data: {
      artist: "A",
      song: "b",
      lyrics: "d",
      translated: true,
      translatedLyrics: "c",
      emotions: {}
    }
  };

  const [state, setState] = useState(initialState);

  const onQueryClickHandler = (artist, song) => {
    setState({
      ...state,
      loading: true
    });
    fetch('/lyrics', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: artist.trim(),
        song: song.trim()
      })
    })
      .then(res => {
        return res.json()
      }).then(data => {
        if (data.err === true) {
          setState({
            ...state,
            err: true,
            errMsg: data.msg,
            loading: false
          })
        }
        else {
          console.log('response:', data)
          setState({
            ...state,
            data,
            loading: false
          })
        }
      })
      .catch(err => {
        console.error(err)
      });
  };

  const backButtonHandler = () => {
    setState(initialState);
  };

  let screen;
  // When there is an error, app will not be rendered (only error modal).
  if (state.err === true) {
    screen = <Error msg={state.errMsg} click={backButtonHandler} />
  } else {
    screen = (
      <div className="App">
        <Form query={(artist, song) => onQueryClickHandler(artist, song)} />
        <Lyrics
          data={state.data}
        />
        <Loading loading={state.loading} />
        <footer className={"Footer"}>
          <h3>Powered by Watson™</h3>
          <img src={WatsonImg} alt="watson logo" />
        </footer>
      </div>
    );
  };

  return screen;
};

export default App;
