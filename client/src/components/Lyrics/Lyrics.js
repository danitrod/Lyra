import React from 'react'
import classes from './Lyrics.module.css'

const Lyrics = (props) => {

    // Component will exist only when lyrics are present
    let content = null;
    if (props.data !== null) {

        let buttons, lyrics, analysis, translatedLyrics;
        const lyricsButton = <button onClick={() => props.showContent('lyrics')} className={props.content === 'lyrics' ? classes.Active : classes.Inactive}>Lyrics</button>
        const analysisButton = <button id={classes.next} onClick={() => props.showContent('analysis')} className={props.content === 'analysis' ? classes.Active : classes.Inactive}>Analysis</button>
        const translationButton = <button id={classes.next} onClick={() => props.showContent('translation')} className={props.content === 'translation' ? classes.Active : classes.Inactive}>Translation</button>
        // Manage content with buttons altering state
        if (props.data.translated === true) {
            buttons = (
                <div className={classes.Buttons}>
                    {lyricsButton}
                    {analysisButton}
                    {translationButton}
                </div>
            );
        } else {
            buttons = (
                <div className={classes.Buttons}>
                    {lyricsButton}
                    {analysisButton}
                </div>
            );
        };

        if (props.content === 'lyrics') {
            lyrics = (
                <div className={classes.Content}>
                    <p>
                        {props.data.lyrics.split('\n').map(line => {
                            return <>{line}<br /></>;
                        })}
                    </p>
                </div>
            );
        } else lyrics = null;

        if (props.content === 'analysis') {
            analysis = (
                <div className={classes.Content}>
                    <p>
                        {Object.keys(props.data.emotions).map(key => {
                            let value;
                            if (key === 'Sentiment') {
                                value = props.data.emotions[`${key}`].label + ' (' + ((100 * Math.abs(props.data.emotions[`${key}`].score)).toFixed(2)).toString() + ')%';
                            } else {
                                value = props.data.emotions[`${key}`].toFixed(2) + '%';
                            }
                            return (
                                <>
                                    <span className={classes[`${key}`]}>{key}</span>: {value}<br />
                                </>);
                        })}
                    </p>
                </div>
            );
        } else analysis = null;

        if (props.content === 'translation') {
            translatedLyrics = (
                <div className={classes.Content}>
                    <p>
                        {props.data.translatedLyrics.split('\n').map(line => {
                            return <>{line}<br /></>;
                        })}
                    </p>
                </div>
            );
        } else translatedLyrics = null;

        content = (
            <>
                <p className={classes.Info}>
                    {`Lyrics for ${props.data.song}, by ${props.data.artist}`}
                </p>
                {buttons}
                {lyrics}
                {analysis}
                {translatedLyrics}
            </>
        );
    }

    return content;
}

export default Lyrics