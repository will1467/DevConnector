import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile'
import { Link } from 'react-router-dom';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';



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
                    <div className="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        {Profile.experience.length > 0 ? (<Fragment>
                            {profile.experience.map(experience => (<ProfileExperience key={experience._id} experience={experience}/>)) }
                            </Fragment> ) : (<h4>No experience credentials</h4>) }
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        {Profile.education.length > 0 ? (<Fragment>
                            {profile.education.map(education => (<ProfileEducation key={education._id} education={education}/>)) }
                            </Fragment> ) : (<h4>No education</h4>) }
                    </div>

                            {profile.githubusername}

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
