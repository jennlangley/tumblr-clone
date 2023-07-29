import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PostsPage from "./components/PostsPage";
import PostDetail from "./components/PostsPage/PostDetail";
import * as postsActions from "./store/posts";
import * as commentsActions from './store/comments';
import * as imagesActions from './store/images';
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
    dispatch(postsActions.getAllPosts())
    dispatch(commentsActions.getAllComments())
    dispatch(imagesActions.getAllImages()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/posts/:postId'>
            <PostDetail isLoaded={isLoaded} />
          </Route>
          <Route path='/posts'>
            <PostsPage isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
