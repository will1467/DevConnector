import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = (props) => {
    const PROFILE = props.profile;
    return (
        <div className="profile-top bg-primary p-2">
            <img
            className="round-img my-1"
            src={PROFILE.user.avatar}
            alt=""
            />
            <h1 className="large">{PROFILE.user.name}</h1>
            <p className="lead">{PROFILE.status} {PROFILE.company && <span> at {PROFILE.company} </span>} </p>
            <p>{PROFILE.location && <span> {PROFILE.location} </span> }</p>

            <div className="icons my-1">
                {PROFILE.website && (
                    <a href={PROFILE.website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}

                {PROFILE.social && PROFILE.social.twitter && (
                    <a href={PROFILE.social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}

                {PROFILE.social && PROFILE.social.facebook && (
                    <a href={PROFILE.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}

                {PROFILE.social && PROFILE.social.linkedin && (
                    <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}

                {PROFILE.social && PROFILE.social.youtube && (
                    <a href={PROFILE.social.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}

                
                {PROFILE.social && PROFILE.social.instagram && (
                    <a href={PROFILE.social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
        </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile : PropTypes.object.isRequired,
}

export default ProfileTop
