import React from "react"
import { NavLink } from "react-router-dom"
import '../EntryPage/EntryPage.css'
const NotFound = () => {

    return (
        <div id="welcome-page">
            <div className="title">Page not found!</div>
            <div id="entry-links-container">
            <NavLink id="entry-link" to="/posts">
                Back to Posts
            </NavLink>
        </div>
        </div>
    
    
    )
}

export default NotFound;