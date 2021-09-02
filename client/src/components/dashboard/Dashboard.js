import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = props => {
    const Auth = props.auth;
    const Profile = props.profile;

    console.log(Profile.profile);

    useEffect(() => {
        props.getUserProfile();
    }, [])

    const hasNoProfile = (
        <Fragment>
            <p> You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment>
    )

    const hasProfile = (
        <Fragment>
        
        </Fragment>
    )


    return Auth.loading && Profile.profile === null ? <Spinner/> : 
      <Fragment>
         <h1 className="large text-primary">Dashboard</h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {Auth.user && Auth.user.name} </p>

      {Profile.profile !== null ? hasProfile : hasNoProfile }

      </Fragment>

      
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
