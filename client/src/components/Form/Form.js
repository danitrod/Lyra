import React, { Component } from 'react'
import classes from './Form.module.css'

class Form extends Component {

    state = {
        songValue: "",
        artistValue: "",
        err: false,
        loading: false
    }

    onArtistChangeHandler = (event) => {
        this.setState({ artistValue: event.target.value })
    }

    onSongChangeHandler = (event) => {
        this.setState({ songValue: event.target.value })
    }

    onEnterKeyHandler = (event) => {
        if (event.key === 'Enter') {
            this.props.query(this.state.artistValue, this.state.songValue)
        }
    }

    render() {
        return (
            <div className={classes.Form}>
                <h1>Lyra, the song analyzer</h1>
                <div className={classes.Query}>
                    <div className={classes.Field}>
                        <h4>Artist</h4>
                        <input
                            value={this.state.artistValue}
                            onChange={(e) => this.onArtistChangeHandler(e)}
                            type="text"
                            onKeyDown={(e) => this.onEnterKeyHandler(e)}
                        />
                    </div>
                    <div className={classes.Field} id={classes.song}>
                        <h4>Song</h4>
                        <input
                            value={this.state.songValue}
                            onChange={(e) => this.onSongChangeHandler(e)}
                            type="text"
                            onKeyDown={(e) => this.onEnterKeyHandler(e)}
                        />
                    </div>
                    <button onClick={() => this.props.query(this.state.artistValue, this.state.songValue)}>Query!</button>
                </div>

            </div>
        )
    }
}

export default Form