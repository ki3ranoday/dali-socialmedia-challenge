import React, { Component } from 'react'
import { connect } from 'react-redux'

import {startCreateUser, login} from '../actions'

class LogInPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            error: ''
        }
    }
    render() {
        return (
            <div className='mobile_view'>
                <div className='centered'>
                    {this.props.current_user && this.props.current_user.creating ?
                        <div>huh</div>
                        :
                        <div>
                            <h4>Welcome to the Dali Social Media App</h4>
                            <p>Please enter your full name to log in.</p>
                            <form onSubmit={this.onSubmit}>
                                <input id='name' type='text' placeholder='name' onChange={this.onChange} value={this.state.name} />
                                <input type='submit' />
                            </form>
                            {this.state.error ?
                                <div>
                                    <p>{this.state.error} <span className='link' onClick={() => this.props.startCreateUser()}>Create account</span></p>
                                </div> : null}
                            <br/>
                        </div>
                    }

                </div>
            </div>
        )
    }

    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };

    onSubmit = (event) => {
        event.preventDefault()
        console.log(this.props)
        const user = this.props.users.filter(user => user['name'] == this.state.name)
        if (user.length == 0) {
            this.setState({ error: "Looks like you don't have an account, want to create one?" })
        }else{
            this.props.login(user[0])
        }
    }
}

const mapStoreToProps = (store) => {
    return {
        users: store.data.users,
        current_user: store.data.current_user
    }
}

export default connect(mapStoreToProps, {startCreateUser, login})(LogInPage)
