import React, { Component } from 'react'
import classes from './Form.module.css'

class Form extends Component {

    state = {
        searchValue: "",
        songValue: "",
        artistValue: "",
        err: false,
        loading: false
    }

    onSearchChangeHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }

    onSearchClickHandler = async () => {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: this.state.searchValue
            })
        })
            .then(res => {
                return res.json()
            }).then(data => {
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            })
        this.setState({ searchValue: "" })
    }

    onArtistChangeHandler = (event) => {
        this.setState({ artistValue: event.target.value })
    }

    onSongChangeHandler = (event) => {
        this.setState({ songValue: event.target.value })
    }

    render() {
        return (
            <div className={classes.Form}>
                <h1>Lyra, the song analyzer</h1>
                <h3>Search for song or artist</h3>
                <div className={classes.Search}>
                    <input value={this.state.searchValue} onChange={(e) => this.onSearchChangeHandler(e)} type="text" />
                    <button onClick={this.onSearchClickHandler}>Search!</button>
                </div>
                <h3>Query for lyric analysis!</h3>
                <div className={classes.Query}>
                    <div className={classes.Field}>
                        <h4>Artist</h4>
                        <input value={this.state.artistValue} onChange={(e) => this.onArtistChangeHandler(e)} type="text" />
                    </div>
                    <div className={classes.Field} id={classes.song}>
                        <h4>Song</h4>
                        <input value={this.state.songValue} onChange={(e) => this.onSongChangeHandler(e)} type="text" />
                    </div>
                    <button onClick={() => this.props.query(this.state.artistValue, this.state.songValue)}>Query!</button>
                </div>
            </div>
        )
    }
}

export default Form