import React from 'react'
import { Link, Redirect } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export const Landing = (props) => {
    if(props.isAuthenticated){
      return <Redirect to="/login"/>
    }

    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated : PropTypes.bool.isRequired
})

export default connect(mapStateToProps)(Landing);