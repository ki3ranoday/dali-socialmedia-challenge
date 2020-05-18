import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../Dali Logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    render() {
        return (
            <div className='nav'>
                <Link to='/'><img className='navhome' src={logo} /></Link>
                <label className='centered'>
                    <span className='navSearch fa fa-search' />
                    <input type='text' placeholder='find user' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
                </label>
                {this.state.search ?
                    <div className='navSearchResults'>
                        {this.showSearchResults()}
                    </div> : null
                }
                <Link to={`/profile/${this.props.current_user.user}`} className='navprof'><span className='fa fa-user'></span></Link>
            </div>
        )
    }
    showSearchResults = () => {
        const searchResults = Object.keys(this.props.users).filter(key => this.props.users[key]['name'].toLowerCase().includes(this.state.search.toLowerCase()))
        if (searchResults.length > 0) {
            return (
                <>
                    {searchResults.map(key => {
                        const user = this.props.users[key];
                        return (
                            <Link className='link' to={`/profile/${key}`}>
                                <p onClick={()=>{this.setState({search:''})}}>
                                    {user['name']}
                                </p>
                            </Link>
                        )
                    })}
                </>
            )
        } else {
            return (
                <p className='text-center'>No Users Match your Search</p>
            )
        }
    }
}
const mapStoreToProps = (store) => {
    return {
        current_user: store.data.current_user,
        users: store.data.users
    }
}
export default connect(mapStoreToProps)(Navbar)