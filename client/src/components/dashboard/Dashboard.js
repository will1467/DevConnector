import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = props => {
    const Auth = props.auth;
    const PROFILE_STATE = props.profile;
    console.log(PROFILE_STATE);
    console.log(Auth);


    useEffect(() => {
        props.getUserProfile();
    }, [])

    return (
        <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                <i className="fas fa-user" /> Welcome {Auth.user && Auth.user.name}
                </p>
            {PROFILE_STATE.profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={PROFILE_STATE.profile.experience} />
                <Education education={PROFILE_STATE.profile.education} />

                {/* <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus" /> Delete My Account
                </button>
                </div> */}
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
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getUserProfile })(Dashboard)
