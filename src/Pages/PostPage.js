import React, { Component } from 'react'
import Post from '../Components/Post'
import { Link } from 'react-router-dom'

export default class PostPage extends Component {
    render() {
        return (
            <div>
                <Link to='/' className='link'>
                    <span className='fa fa-arrow-left ' style={{ fontSize: '25px' }} />
                </Link>
                <Post postkey={this.props.match.params.key} details={true} />
            </div>
        )
    }
}
