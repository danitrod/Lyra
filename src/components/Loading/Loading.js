import React from 'react'
import './Loading.css'

const Loading = ({ loading }) => {
    let component = null;
    if (loading === true) {
        component = (
            <div className="loading-screen">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
    return component;
}

export default Loading