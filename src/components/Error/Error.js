import React from 'react'
import classes from './Error.module.css'

const Error = (props) => {
    return (
        <div className={classes.Error}>
            <h1>Error</h1>
            <p>{props.msg}</p>
            <button className={classes.back} onClick={props.click}>Back</button>
        </div>)
}

export default Error