import React, { Component } from 'react'
import classes from './Lyrics.module.css'

class Lyrics extends Component {
    render() {
        return (
            <div className={classes.Lyrics}>
                <p>
                    {this.props.lyrics.split('\n').map(line => {
                        return <>{line}<br /></>
                    })}
                </p>
                <p>
                    {this.props.emotions !== undefined ? this.props.emotions.split('\n').map(line => {
                        return <>{line}<br /></>
                    }) : "The analysis will appear here!"}
                </p>
            </div>
        )
    }
}

export default Lyrics