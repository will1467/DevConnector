import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom'
import { Fragment, useState } from 'react';

function AddExperience(props) {

    const [formData, setFormData] = useState({
        company : '',
        title : '',
        location : '',
        from : '',
        to : '',
        current : false,
        description : ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
      }
  
    const onSubmit = (e) => {
        e.preventDefault();
        props.addExperience(formData, props.history);
    }

    const onCurrentChange = (e) => {
        setFormData({...formData, current: !formData.current});
        toggleDisabled(!toDateDisabled);
    }

    return (
        <Fragment>
           <h1 className="large text-primary">
       Add An Experience
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" value={formData.title} onChange={(e) => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Company" name="company"  value={formData.company} onChange={(e) => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="Location" name="location"  value={formData.location} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"  value={formData.from} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <p><input type="checkbox" name="current" onChange={(e) => onCurrentChange(e)} checked={formData.current} /> Currently Studying</p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" disabled={toDateDisabled ? 'disabled' : ''} value={formData.to} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <textarea
                value={formData.description}
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                onChange={(e) => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form> 
      </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience : PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience))

