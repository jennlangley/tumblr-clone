import React from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './EntryPage.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const EntryPage = () => {

    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to="/posts" />
    return (
        <div className="welcome-container">
            <div id="welcome-page">
                <div>
                    <h1>Welcome!</h1> 
                </div>
                <div id="entry-links-container">
                    <NavLink id="entry-link" to="/posts">View recent posts</NavLink>
                </div>
                <div id="entry-links-container">
                    <NavLink id="entry-link" to="/login">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default EntryPage;