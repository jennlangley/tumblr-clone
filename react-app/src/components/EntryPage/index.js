import React from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const EntryPage = () => {

    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to="/posts" />
    return (
        <div>
            <h1>Welcome to Ramble!</h1>
            
        </div>
       

    )
}

export default EntryPage;