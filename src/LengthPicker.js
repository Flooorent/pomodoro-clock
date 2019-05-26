import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import './LengthPicker.css'

function LengthPicker(props) {
    return (
        <div className="length-picker-container">
            <div id={`${props.label}-label`}>{props.label} length</div>
            <div className="picker-container">
                <FontAwesomeIcon
                    id={`${props.label}-decrement`}
                    icon={faArrowDown}
                    onClick={props.handleDecrementClick}
                />

                <div id={`${props.label}-length`}>{props.length}</div>

                <FontAwesomeIcon
                    id={`${props.label}-increment`}
                    icon={faArrowUp}
                    onClick={props.handleIncrementClick}
                />
            </div>
        </div>
    )
}

LengthPicker.propTypes = {
    label: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    handleDecrementClick: PropTypes.func.isRequired,
    handleIncrementClick: PropTypes.func.isRequired,
}

export default LengthPicker
