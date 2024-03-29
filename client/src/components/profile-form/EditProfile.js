import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Profile } from '../../actions/constants';
import { Fragment } from 'react';
import { createProfile, getUserProfile } from '../../actions/profile';

function EditProfile(props) {
  const { loading, getUserProfile, profile } = props;


    const [formData, setFormData] = useState(
        Profile
    )

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    useEffect(() => {

      if (!profile) getUserProfile();
      if (!props.loading && profile) {
        const profileData = { ...Profile };
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
        if (Array.isArray(profileData.skills))
          profileData.skills = profileData.skills.join(', ');
        setFormData(profileData);
      }
    }, [loading, getUserProfile, profile]);

    const onChange = (e) => {
      setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
      e.preventDefault();
      props.createProfile(formData, props.history, true);
    }

    return (
      <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={formData.company} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={formData.website} onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={formData.location} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input value={formData.githubusername} onChange={(e) => onChange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea value={formData.bio} onChange={(e) => onChange(e)} placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
           <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" value={formData.twitter} onChange={(e) => onChange(e)} placeholder="Twitter URL" name="twitter" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" value={formData.facebook} onChange={(e) => onChange(e)} placeholder="Facebook URL" name="facebook" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" value={formData.youtube} onChange={(e) => onChange(e)} placeholder="YouTube URL" name="youtube" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" value={formData.linkedin} onChange={(e) => onChange(e)} placeholder="Linkedin URL" name="linkedin" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" value={formData.instagram} onChange={(e) => onChange(e)} placeholder="Instagram URL" name="instagram" />
        </div>
        </Fragment> }

       
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1" >Go Back</Link>
      </form>
      </Fragment>
    )
}

EditProfile.propTypes = {
  createProfile : PropTypes.func.isRequired,
  getUserProfile : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  loading : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  profile : state.profile.profile,
  loading : state.profile.loading
})

export default connect(mapStateToProps, { createProfile, getUserProfile } )(withRouter(EditProfile))

