import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile'
import { Link } from 'react-router-dom';


const Profile = ({getProfileByID, profile, auth, match}) => {
    const Profile = profile.profile;
    console.log(Profile);
    useEffect(() => {
        getProfileByID(match.params.id)
    },[getProfileByID, match.params.id])

    return (
        <Fragment>
            {profile === null || profile.loading === true ? <Spinner/> : 
            <Fragment>
                <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
                {auth.isAuthenticated && profile.loading === false && auth.user._id === Profile.user._id && 
                 <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>}
                  <div class="profile-grid my-1">
                    <ProfileTop profile={Profile} />
                    <ProfileAbout profile={Profile}/>
                  </div>
            </Fragment>} 
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth : state.auth

})

export default connect(mapStateToProps, { getProfileByID })(Profile)
