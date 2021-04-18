import React from 'react'

const Navbar = ({ user, logout }) => (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand">Hello {user.name}!</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <button className="btn btn-outline-success pull-right" type="button"
                    onClick={logout}>Sign out</button>
            </div>
        </div>
    </nav>
)

export default Navbar