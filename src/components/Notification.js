import React from 'react'

const Notification = ({ notification }) => {
    if (notification) {
        return (
            <div className={`alert alert-${notification.class}`}>{notification.message}</div>
        )
    }

    return (
        <div></div>
    )
}

export default Notification