import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createPost, likeUnlike } from '../actions'
import Post from '../Components/Post';

export class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posttext: ''
        }
    }
    render() {
        return (
            <div className='mobile_view'>
                <form className='text-center' style={{ marginBottom: '15px' }} onSubmit={this.handleSubmit}>
                    <textarea
                        type='text'
                        id='posttext'
                        placeholder="What's on your mind? Got some hot takes?"
                        value={this.state.posttext}
                        onChange={this.onChange}
                    />
                    <br />
                    <input type='submit' value='Post'></input>
                </form>
                {this.props.posts ?
                    Object.keys(this.props.posts).sort(() => { return -1 }).map(key => {
                        return (
                            <Post postkey={key}/>
                        )
                    })
                    :
                    <p className='text-center'> There are no posts right now </p>
                }
            </div>
        )
    }
    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.posttext) {
            const now = new Date();
            const post = {
                'text': this.state.posttext,
                'time': now.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    minute: 'numeric',
                    hour: 'numeric'
                }),
                'user': this.props.current_user['user']
            }
            this.props.createPost(post)
            this.setState({posttext:''})
        }
    }
}

const mapStoreToProps = (store) => ({
    users: store.data.users,
    current_user: store.data.current_user,
    posts: store.data.posts
})

export default connect(mapStoreToProps, { createPost, likeUnlike })(PostsPage)
