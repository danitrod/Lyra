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
    data: null,
    showContent: false
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

  const contentButtonHandler = (content) => {
    const showContent = state.showContent === content ? false : content;
    const newState = {
      ...state,
      showContent
    }
    setState(newState);
  }

  let screen;
  // When there is an error, app will not be rendered (only error modal).
  if (state.err === true) {
    screen = <Error msg={state.errMsg} click={backButtonHandler} />
  } else {
    let content;
    if (state.showContent !== false) {
      content = (
        <Lyrics
          data={state.data}
          content={state.showContent}
          showContent={contentButtonHandler}
        />
      )
    } else {
      content = (
        <>
          <Form query={(artist, song) => onQueryClickHandler(artist, song)} />
          <Lyrics
            data={state.data}
            showContent={contentButtonHandler}
          />
          <Loading loading={state.loading} />
          <footer className={"Footer"}>
            <h3>Powered by Watson™</h3>
            <img src={WatsonImg} alt="watson logo" />
          </footer>
          <p className="reference">Lyrics from <a href="https://letras.com/" target="_blank" rel="noopener noreferrer">https://letras.com/</a></p>
        </>
      );
    }
    screen = (
      <div className="App">
        {content}
      </div>
    );
  };

  return screen;
};

export default App;
