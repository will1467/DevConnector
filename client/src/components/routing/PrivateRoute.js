import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../reducers/auth';

const PrivateRoute = props => {
    const Component = props.Component;
    return (
            <Route render={(props) => !auth.isAuthenticated && ! auth.loading ? 
                                      (<Redirect to="/login"/>) : (<Component {...props}/>) }>
            </Route>
            )
}

PrivateRoute.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
