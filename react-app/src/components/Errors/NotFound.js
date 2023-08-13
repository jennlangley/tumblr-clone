import React from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const NotFound = () => {

    return (
    
    <Redirect to='/posts' />
    // <div className="welcome-container">
    //     <div id="welcome-page">
    //         <h2>Uh oh! Page not found.</h2>
    //     </div>
        
    // </div>
    
    
    )
}

export default NotFound;