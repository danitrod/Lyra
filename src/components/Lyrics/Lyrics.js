import React, { Fragment } from 'react'
import classes from './Lyrics.module.css'

const Lyrics = (props) => {

    // Component will exist only when lyrics are present
    const content = props.data === null ? null : (
        <>
            <p className={classes.Info}>
                {`Lyrics for ${props.data.song}, by ${props.data.artist}`}
            </p>
            <div className={classes.Lyrics}>
                <p>
                    {props.data.lyrics.split('\n').map(line => {
                        return <>{line}<br /></>
                    })}
                </p>
                <p>
                    {Object.keys(props.data.emotions).map(key => {
                        let line = null;
                        if (key === 'Sentiment') {
                            line = <Fragment key={key}>Sentiment: {props.data.emotions[`${key}`].label} ({(100 * Math.abs(props.data.emotions[`${key}`].score)).toFixed(2)}%)<br /></Fragment>
                        } else {
                            line = <Fragment key={key}>{key}: {props.data.emotions[`${key}`].toFixed(2)}%<br /></Fragment>
                        }
                        return line;
                    })}
                </p>
            </div>
        </>
    );

    return content;
}

export default Lyrics