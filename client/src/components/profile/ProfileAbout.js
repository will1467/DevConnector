import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = props => {
    const PROFILE = props.profile;
    return (
        <div className="profile-about bg-light p-2">
          {PROFILE.bio &&
              <Fragment>
                  <h2 className="text-primary">{PROFILE.user.name.trim().split(' ')[0]}'s Bio</h2>
                    <p>
                        {PROFILE.bio}
                    </p>
                    <div className="line"></div>
              </Fragment>}
          
         
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {PROFILE.skills.map((skill, index) => {
                 return (<div key={index} className="p-1"><i className="fa fa-check"></i>{skill}</div> )
            })
            }
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
