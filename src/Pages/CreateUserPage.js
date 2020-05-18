import React, { Component } from 'react'
import { connect } from 'react-redux'
import { storage } from '../firebase'
import { createUser, cancleCreateUser } from '../actions'

export class CreateUserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: "",
            picture: "",
            pictureFile: null,
            gender: "",

            American_Indian_or_Alaska_Native: "",
            Asian: '',
            Black_or_African_American: "",
            Hispanic_or_Latino: "",
            Middle_Eastern: "",
            Native_Hawaiian_or_Other_Pacific_Islander: "",
            White: "",
            Other: "",

            major: "",
            minor: "",
            modification: "",
            birthday: "",
            role: "",
            home: "",
            quote: "",
            favoriteShoe: "",
            favoriteArtist: "",
            favoriteColor: "",
            phoneType: "",

            inProgress:false
        }
    }
    render() {
        return (
            <div className='mobile_view'>
                <br /><br /><br />
                <div className='row text-left'>
                    <div className='col-4 bold'>Name:</div>
                    <input disabled type='text' className='col-8' value={this.props.name} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Picture:</div>
                    <input className='col-8' type='file' id='picture' onChange={e => {
                        if (e.target.files[0])
                            this.setState({ pictureFile: e.target.files[0] })
                    }} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Year:</div>
                    <div className='col-8'>
                        <label>
                            <input type='radio' value="'23"
                                checked={this.state.year == "'23"}
                                onChange={(event) => this.setState({ year: event.target.value })}
                            />
                                '23
                            </label> &nbsp;
                            <label>
                            <input type='radio' value="'22"
                                checked={this.state.year == "'22"}
                                onChange={(event) => this.setState({ year: event.target.value })}
                            />
                                '22
                            </label>&nbsp;
                            <label>
                            <input type='radio' value="'21"
                                checked={this.state.year == "'21"}
                                onChange={(event) => this.setState({ year: event.target.value })}
                            />
                                '21
                            </label>&nbsp;
                            <label>
                            <input type='radio' value="'20"
                                checked={this.state.year == "'20"}
                                onChange={(event) => this.setState({ year: event.target.value })}
                            />
                            '20
                            </label>
                    </div>
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Gender:</div>
                    <div className='col-8'>
                        <label>
                            <input type='radio' value="Male"
                                checked={this.state.gender == "Male"}
                                onChange={(event) => this.setState({ gender: event.target.value })}
                            />
                                Male
                            </label> &nbsp;
                            <label>
                            <input type='radio' value="Female"
                                checked={this.state.gender == "Female"}
                                onChange={(event) => this.setState({ gender: event.target.value })}
                            />
                                Female
                            </label>&nbsp;
                            <label>
                            <input type='radio' value="Other"
                                checked={this.state.gender && this.state.gender != 'Male' && this.state.gender != 'Female'}
                                onChange={(event) => this.setState({ gender: event.target.value })}
                            />
                                Other
                            </label>&nbsp;
                        </div>
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Race:</div>
                    <label className='col-8'>
                        <input type='checkbox' value='American Indian or Alaska Native'
                            checked={this.state.American_Indian_or_Alaska_Native}
                            onChange={event => this.setState({ American_Indian_or_Alaska_Native: event.target.value == 'American Indian or Alaska Native' ? null : 'American Indian or Alaska Native' })}
                        />
                        American Indian or Alaska Native
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Asian'
                            checked={this.state.Asian}
                            onChange={event => this.setState({ Asian: event.target.value == 'Asian' ? null : 'Asian' })}
                        />
                        Asian
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Black or African American'
                            checked={this.state.Black_or_African_American}
                            onChange={event => this.setState({ Black_or_African_American: event.target.value == 'Black or African American' ? null : 'Black or African American' })}
                        />
                        Black or African American
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Hispanic or Latino'
                            checked={this.state.Hispanic_or_Latino}
                            onChange={event => this.setState({ Hispanic_or_Latino: event.target.value == 'Hispanic or Latino' ? null : 'Hispanic or Latino' })}
                        />
                        Hispanic or Latino
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Middle Eastern'
                            checked={this.state.Middle_Eastern}
                            onChange={event => this.setState({ Middle_Eastern: event.target.value == 'Middle Eastern' ? null : 'Middle Eastern' })}
                        />
                        Middle Eastern
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Native Hawaiian or Other Pacific Islander'
                            checked={this.state.Native_Hawaiian_or_Other_Pacific_Islander}
                            onChange={event => this.setState({ Native_Hawaiian_or_Other_Pacific_Islander: event.target.value == 'Native Hawaiian or Other Pacific Islander' ? null : 'Native Hawaiian or Other Pacific Islander' })}
                        />
                        Native Hawaiian or Other Pacific Islander
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='White'
                            checked={this.state.White}
                            onChange={event => this.setState({ White: event.target.value == 'White' ? null : 'White' })}
                        />
                        White
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4'></div>
                    <label className='col-8'>
                        <input type='checkbox' value='Other'
                            checked={this.state.Other}
                            onChange={event => this.setState({ Other: event.target.value == 'Other' ? null : 'Other' })}
                        />
                        Other
                    </label>
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Major:</div>
                    <input type='text' className='col-8' id='major' placeholder='major' value={this.state.major} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Minor:</div>
                    <input type='text' className='col-8' id='minor' placeholder='minor' value={this.state.minor} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Modification:</div>
                    <input type='text' className='col-8' id='modification' placeholder='modification' value={this.state.modification} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Birthday:</div>
                    <input type='text' className='col-8' id='birthday' placeholder='mm/dd/yyyy' value={this.state.birthday} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Home:</div>
                    <input type='text' className='col-8' id='home' placeholder='Hanover, NH' value={this.state.home} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Role:</div>
                    <input type='text' className='col-8' id='role' placeholder='role' value={this.state.role} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Quote:</div>
                    <input type='text' className='col-8' id='quote' placeholder='quote' value={this.state.quote} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Favorite Shoe:</div>
                    <input type='text' className='col-8' id='favoriteShoe' placeholder='shoe' value={this.state.favoriteShoe} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Favorite Artist:</div>
                    <input type='text' className='col-8' id='favoriteArtist' placeholder='artist' value={this.state.favoriteArtist} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Favorite Color:</div>
                    <input type='text' className='col-8' id='favoriteColor' placeholder='color' value={this.state.favoriteColor} onChange={this.onChange} />
                </div>
                <div className='row text-left'>
                    <div className='col-4 bold'>Phone Type:</div>
                    <div className='col-8'>
                        <label>
                            <input type='radio' value="iOS"
                                checked={this.state.phoneType == "iOS"}
                                onChange={(event) => this.setState({ phoneType: event.target.value })}
                            />
                                iOS
                        </label> &nbsp;
                        <label>
                            <input type='radio' value="Android"
                                checked={this.state.phoneType == "Android"}
                                onChange={(event) => this.setState({ phoneType: event.target.value })}
                            />
                                Android
                        </label> &nbsp;
                        <label>
                            <input type='radio' value="Other"
                                checked={this.state.phoneType == "Other"}
                                onChange={(event) => this.setState({ phoneType: event.target.value })}
                            />
                                Other
                        </label> &nbsp;
                        </div>
                </div>

                <input type='button' value='Cancle' onClick={() => this.props.cancleCreateUser()}/> &nbsp;
                <input type='submit' onClick={this.handleSubmit} />
                <br/><br/><br/>
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
        event.preventDefault();
        this.setState({ inProgress: true })
        const image = this.state.pictureFile
        if (image) {
            const uploadTask = storage.ref(`images/${this.props.name}${image.name}`).put(image)
            uploadTask.on('state_changed',
                progress=>{}, //not going to use the progress function
                error => {
                    this.setState({ error: error, inProgress: false })
                },  //error function
                () => {  //done function
                    storage.ref(`images/${this.props.name}${image.name}`).getDownloadURL().then(url => {
                        this.createUser(url)
                    })
                    this.setState({ inProgress: false })
                }
            )
        }else {
            this.createUser('');
        }
    }
    createUser = (url) => {
        const new_user = {
            "name": this.props.name,
            "year": this.state.year,
            "picture": url,
            "gender": this.state.gender,
            "American Indian or Alaska Native": this.state.American_Indian_or_Alaska_Native,
            "Asian": this.state.Asian,
            "Black or African American": this.state.Black_or_African_American,
            "Hispanic or Latino": this.state.Hispanic_or_Latino,
            "Middle Eastern": this.state.Middle_Eastern,
            "Native Hawaiian or Other Pacific Islander": this.state.Native_Hawaiian_or_Other_Pacific_Islander,
            "White": this.state.White,
            "Other": this.state.Other,
            "major": this.state.major,
            "minor": this.state.minor,
            "modification": this.state.modification,
            "birthday": this.state.birthday,
            "role": this.state.role,
            "home": this.state.home,
            "quote": this.state.quote,
            "favoriteShoe": this.state.favoriteShoe,
            "favoriteArtist": this.state.favoriteArtist,
            "favoriteColor": this.state.favoriteColor,
            "phoneType": this.state.phoneType
        }
        this.props.createUser(new_user)
    }
}


export default connect(null, {createUser, cancleCreateUser})(CreateUserPage)
