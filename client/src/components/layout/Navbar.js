import React from 'react'
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = (props) => {

    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href='#!'>
                <i className="i.fas.fa-sing-out-alt"></i> {' '}
                <span className="hide-sm"> Logout </span></a>
            </li>
        </ul>
    );

    const guestLinks = (
        <div>
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> <i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            
        </nav>
    </div>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout }) (Navbar);
