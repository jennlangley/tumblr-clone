import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PostsPage from "./components/PostsPage";
import PostDetail from "./components/PostsPage/PostDetail";
import MyCommentsPage from "./components/MyCommentsPage";
import MyPostsPage from "./components/MyPostsPage";
import MyLikesPage from "./components/MyLikesPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  const user = useSelector(state => state.session.user);

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
          <Route path={`/users/${user?.id}/comments`}>
            <MyCommentsPage isLoaded={isLoaded} />
          </Route>
          <Route path={`/users/${user?.id}/posts`}>
            <MyPostsPage isLoaded={isLoaded} />
          </Route>
          <Route path={`/users/${user?.id}/likes`}>
            <MyLikesPage isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
