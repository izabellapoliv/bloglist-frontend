import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ buttonLabel, primaryClass, children }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = visible ? 'd-none' : ''
    const showWhenVisible = visible ? '' : 'd-none'

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div className="d-inline">
            <div className={hideWhenVisible}>
                <button onClick={toggleVisibility}
                    className={`btn btn-${primaryClass} btn-xs`}>{buttonLabel}</button>
            </div>
            <div className={showWhenVisible}>
                <button onClick={toggleVisibility}
                    className="btn btn-secondary btn-xs">Cancel</button>
                <br /><br />
                {children}
                <hr />
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable