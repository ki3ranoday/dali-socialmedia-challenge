import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchUsers, fetchPosts } from './actions'

import  CreateUserPage from './components/CreateUserPage';
import  LogInPage  from './components/LogInPage';
import  ProfilePage from './components/ProfilePage';
import  PostsPage  from './components/PostsPage';
import  PostPage  from './components/PostPage';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchUsers()
  }
  render() {
    return (
      <div>
        {this.props.current_user && this.props.current_user.loggedIn ? //check if the user is logged in
          //if the user is logged in, route normally through the app (posts are the default page)
          <Switch>
            <Route path='/profile/:id' component={<ProfilePage />} />
            <Route exact path='/posts' component={<PostsPage />} />
            <Route path='/posts/:id' component={<PostPage />} />
            <Route component={<PostsPage />} />
          </Switch>
          : //if not check if the user is trying to log in or create a new user
          <LogInPage />
        }

      </div>

    )
  }
}

const mapStoreToProps = (store) => {
  return {
    users: store.data.users,
    posts: store.data.posts,
    current_user: store.data.current_user
  }
}
export default connect(mapStoreToProps, { fetchUsers, fetchPosts })(App);
