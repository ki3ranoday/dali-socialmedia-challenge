import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createPost, likeUnlike } from '../actions'

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
                        className='postbox'
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
                        const post = this.props.posts[key]
                        const user = this.props.users[post.user]
                        return (
                            <div className='post'>
                                <Link className='postlink' to={`/posts/${key}`}>
                                    <p>{post['text']}</p>
                                </Link>
                                {/* this line is confusing but it makes the heart red if the current user has liked it */}
                                <p className={`postlike${post['likes'] && post['likes'][this.props.current_user.user] ? ' red' : ''}`}>
                                    {/* shows the number of likes next to the heart */}
                                    {post['likes'] ? Object.keys(post['likes']).filter(key=>{return post['likes'][key]}).length : '0'}
                                    <span
                                        className="fa fa-heart"
                                        onClick={() => { this.likeUnlike(key) }}
                                    />
                                </p>
                                <Link className='postlink postcom' to={`/posts/${key}`}>
                                    {post['comments'] ? Object.keys(post['comments']).length : '0'}
                                    <span className='fa fa-comment' />
                                </Link>
                                <p className='posttime'>{post['time']}</p>
                                <Link className='postlink postprof' to={`/profile/${post.user}`}>
                                    -{user ? user['name'] : null}
                                </Link>

                            </div>
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

    likeUnlike = (postkey) => { //toggles the like/unlike for this user
        const post = this.props.posts[postkey]
        const updatekey = '' + postkey + "/likes/" + this.props.current_user.user
        console.log(updatekey)
        var updateVal = {}
        updateVal[updatekey] = false
        if (!post['likes'] || !post['likes'][this.props.current_user.user]) {
            updateVal[updatekey] = true
        }
        this.props.likeUnlike(updateVal);
    }
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
