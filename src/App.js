import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Lyrics from './components/Lyrics/Lyrics';
import Loading from './components/Loading/Loading';
import WatsonImg from './images/watson.png';

function App() {

  const initialState = {
    loading: false,
    err: false,
    errMsg: "",
    data: null
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
        artist,
        song
      })
    })
      .then(res => {
        return res.json()
      }).then(data => {
        if (data.err === true) {
          console.log(data.msg);
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

  return (
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

export default App;
