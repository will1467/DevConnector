import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = props => {
    const Auth = props.auth;
    const PROFILE_STATE = props.profile;

    const { getUserProfile } = props;



    useEffect(() => {
        getUserProfile();
    }, [getUserProfile])

    return (
        <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                <i className="fas fa-user" /> Welcome {Auth.user && Auth.user.name}
                </p>
            {PROFILE_STATE.profile !== null ? (
            <Fragment>
                <DashboardActions />
                {PROFILE_STATE.profile.experience.length > 0 ? <Experience experience={PROFILE_STATE.profile.experience}/> : ''}
                {PROFILE_STATE.profile.education.length > 0 ? <Education education={PROFILE_STATE.profile.education}/> : ''}

                <div className="my-2">
                <button className="btn btn-danger" onClick={() => props.deleteAccount()}>
                    <i className="fas fa-user-minus" /> Delete My Account
                </button>
                </div>
            </Fragment>
            ) : (
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
                </Link>
            </Fragment>
            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getUserProfile : PropTypes.func.isRequired,
    deleteAccount : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getUserProfile, deleteAccount })(Dashboard)
