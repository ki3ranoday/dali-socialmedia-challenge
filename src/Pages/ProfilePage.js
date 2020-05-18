import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Components/Post'

export class ProfilePage extends Component {
    render() {
        const user = this.props.users[this.props.match.params.id]
        return (
            <div className='mobile_view'>
                <div className='container'>
                    <img src={user['picture']} className='profile-pic' />
                    <h1>{user['name']}</h1>
                    <h6>Year: {user['year']}</h6>
                    <h6>Major: {user['major']} {user['modification'] ? `modified with ${user['modification']}` : ''}</h6>
                    {user['minor'] ? <h6>Minor: {user['minor']}</h6> : null}
                    <h6>Dali Role: {user['role']}</h6>
                </div>
                <hr />
                <h6 className='text-center'>Posts</h6>
                {this.renderPosts()}
            </div>
        )
    }

    renderPosts = () => {
        const posts = Object.keys(this.props.posts).filter(key => {
            return this.props.posts[key]['user'] == this.props.match.params.id
        })
        if(posts.length > 0){
            return (<>
                {posts.map(key => {
                    return <Post postkey={key}/>
                })}
            </>
            )
        } else {
            return <p className='text-center'>No Posts Yet</p>
        }
    }
}

const mapStateToProps = (state) => ({
    users: state.data.users,
    posts: state.data.posts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
