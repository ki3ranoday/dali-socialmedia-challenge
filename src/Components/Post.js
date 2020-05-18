import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { likeUnlike, comment } from '../actions'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comtext: ''
        }
    }
    render() {
        const { postkey } = this.props
        const post = this.props.posts[postkey]
        if (!post) {
            return (
                <p className='text-danger'>Sorry there was an error fetching this post</p>
            )
        }
        const user = this.props.users[post.user]
        return (
            <div className='post'>
                <div className='container'>
                    <Link className='postlink' to={`/posts/${postkey}`}>
                        <p>{post['text']}</p>
                    </Link>
                    {/* this line is confusing but it makes the heart red if the current user has liked it */}
                    <p className={`postlike${post['likes'] && post['likes'][this.props.current_user.user] ? ' red' : ''}`}>
                        {/* shows the number of likes next to the heart */}
                        {post['likes'] ? Object.keys(post['likes']).filter(key => { return post['likes'][key] }).length : '0'}
                        <span
                            className="fa fa-heart"
                            onClick={() => { this.likeUnlike(postkey) }}
                        />
                    </p>
                    <Link className='postlink postcom' to={`/posts/${postkey}`}>
                        {post['comments'] ? Object.keys(post['comments']).length : '0'}
                        <span className='fa fa-comment' />
                    </Link>
                    <p className='posttime'>{post['time']}</p>
                    <Link className='postlink postprof' to={`/profile/${post.user}`}>
                        -{user ? user['name'] : null}
                    </Link>

                </div>
                {this.props.details ?
                    <div>
                        <hr />
                        {post['comments'] && Object.keys(post['comments']).length > 0 ?
                            <>
                                {Object.keys(post['comments']).map(key => {
                                    const comment = post['comments'][key]
                                    const user = this.props.users[comment['user']]
                                    return (
                                        <div className='container'>
                                            <p>"{comment['text']}"</p>
                                            <p className='posttime'>{comment['time']}</p>
                                            <Link className='postlink postprof' to={`/profile/${comment.user}`}>
                                                -{user ? user['name'] : null}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <p className='text-center'>Nobody has commented yet</p>
                        }
                        <form className='text-center' onSubmit={this.handleSubmit}>
                            <textarea
                                type='text'
                                id='comtext'
                                placeholder="Leave a comment"
                                value={this.state.comtext}
                                onChange={this.onChange}
                            /> <br />
                            <input type='submit' value='comment' />
                        </form>
                    </div> : null
                }
            </div>
        )
    }
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
    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };
    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.comtext) {
            const now = new Date();
            const comment = {
                'text': this.state.comtext,
                'time': now.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    minute: 'numeric',
                    hour: 'numeric'
                }),
                'user': this.props.current_user.user
            }
            this.props.comment(this.props.postkey, comment)
            this.setState({ comtext: '' })
        }
    }
}

const mapStoreToProps = (store) => ({
    users: store.data.users,
    current_user: store.data.current_user,
    posts: store.data.posts
})

export default connect(mapStoreToProps, { likeUnlike, comment })(Post)