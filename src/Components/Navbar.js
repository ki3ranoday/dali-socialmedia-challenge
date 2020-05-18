import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../Dali Logo.png'

class Navbar extends Component {
    render() {
        return (
            <div className='nav'>
                <Link to='/'><img className='navhome' src={logo} /></Link>
                <Link to={`profile/${this.props.current_user.user}`} className='navprof'><span className='fa fa-user'></span></Link>
            </div>
        )
    }
}
const mapStoreToProps = (store) => {
    return {
        current_user: store.data.current_user
    }
}
export default connect(mapStoreToProps)(Navbar)