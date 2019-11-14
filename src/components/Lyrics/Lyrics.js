import React, { Fragment, useState } from 'react'
import classes from './Lyrics.module.css'

const Lyrics = (props) => {

    const initialState = {
        showLyrics: false,
        showAnalysis: false,
        showTranslation: false
    };

    const [state, setState] = useState(initialState);

    const showLyricsHandler = () => {
        if (state.showAnalysis === false && state.showTranslation === false) {
            const updatedState = !state.showLyrics;
            setState({
                ...state,
                showLyrics: updatedState
            });
        };
    };

    const showAnalysisHandler = () => {
        if (state.showLyrics === false && state.showTranslation === false) {
            const updatedState = !state.showAnalysis;
            setState({
                ...state,
                showAnalysis: updatedState
            });
        };
    };

    const showTranslationHandler = () => {
        if (state.showLyrics === false && state.showAnalysis === false) {
            const updatedState = !state.showTranslation;
            setState({
                ...state,
                showTranslation: updatedState
            });
        };
    };

    // Component will exist only when lyrics are present
    let content = null;
    if (props.data !== null) {

        let buttons, lyrics, analysis, translatedLyrics;
        const lyricsButton = <button onClick={showLyricsHandler} className={state.showLyrics === true ? classes.Active : classes.Inactive}>Lyrics</button>
        const analysisButton = <button id={classes.next} onClick={showAnalysisHandler} className={state.showAnalysis === true ? classes.Active : classes.Inactive}>Analysis</button>
        const translationButton = <button id={classes.next} onClick={showTranslationHandler} className={state.showTranslation === true ? classes.Active : classes.Inactive}>Translation</button>
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

        if (state.showLyrics === true) {
            lyrics = (
                <div className={classes.Content}>
                    <div className={classes.Lyrics}>
                        <p>
                            {props.data.lyrics.split('\n').map(line => {
                                return <>{line}<br /></>;
                            })}
                        </p>
                    </div>
                </div>
            );
        } else lyrics = null;

        if (state.showAnalysis === true) {
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
                                <Fragment>
                                    <span className={classes[`${key}`]}>{key}</span>: {value}<br />
                                </Fragment>);
                        })}
                    </p>
                </div>
            );
        } else analysis = null;

        if (state.showTranslation === true) {
            translatedLyrics = (
                <p>
                    {props.data.translatedLyrics.split('\n').map(line => {
                        return <>{line}<br /></>;
                    })}
                </p>
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