import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchUsers, fetchPosts } from './actions'

import LogInPage from './Pages/LogInPage';
import ProfilePage from './Pages/ProfilePage';
import PostsPage from './Pages/PostsPage';
import PostPage from './Pages/PostPage';
import Navbar from './Components/Navbar';

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
          <div className='mobile_view'>
            <Navbar />
            <Switch>
              <Route path='/profile/:id' component={ProfilePage} />
              <Route exact path='/posts' component={PostsPage} />
              <Route path='/posts/:key' component={PostPage} />
              <Route component={PostsPage} />
            </Switch>
          </div>
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
