import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
 
const Profiles = props => {
    const PROFILE_STATE = props.profile;
    const { getProfiles } = props;

    useEffect(() => {
        getProfiles();
    }, [getProfiles])

    return <Fragment>
          { PROFILE_STATE.loading ? <Spinner/> : <Fragment>
               <h1 className="large-text-primary">Developers</h1>
               <p className="lead">
                 <i className="fab fa-connectdevelop"></i> Browse and connect with other developers
               </p>
               <div className="profiles">
                   {PROFILE_STATE.profiles.length > 0 ? 
                    PROFILE_STATE.profiles.map((profile) => {
                       return <ProfileItem key={profile._id} profile={profile} />
                    }) : <h4>No Profiles Found</h4> }
               </div>
                </Fragment> }
        </Fragment>
}

Profiles.propTypes = {
    getProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
