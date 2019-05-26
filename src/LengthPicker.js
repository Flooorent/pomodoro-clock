import React from 'react'
import './LengthPicker.css'

function LengthPicker(props) {
    return (
        <div className="length-picker-container">
            <div id={`${props.label}-label`}>{props.name}</div>
            <div className="picker-container">
                <div id={`${props.label}-decrement`}></div>
                <div>{props.length}</div>
                <div id={`${props.label}-increment`}></div>
            </div>
        </div>
    )
}

export default LengthPicker
