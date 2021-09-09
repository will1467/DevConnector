import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { withRouter } from 'react-router-dom'
import { Fragment, useState } from 'react';

function AddEducation(props) {

    const [formData, setFormData] = useState({
        school : '',
        degree : '',
        fieldofstudy : '',
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
        props.addEducation(formData, props.history);
    }

    const onCurrentChange = (e) => {
        setFormData({...formData, current: !formData.current});
        toggleDisabled(!toDateDisabled);
    }

    return (
        <Fragment>
           <h1 className="large text-primary">
       Add Your Education
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any school/bootcamp you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
            <input type="text" placeholder="School/Bootcamp" name="school" value={formData.school} onChange={(e) => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="Degree/Certificate" name="degree"  value={formData.degree} onChange={(e) => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="Field of Study" name="fieldofstudy"  value={formData.fieldofstudy} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"  value={formData.from} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <p><input type="checkbox" name="current" onChange={(e) => onCurrentChange(e)} checked={formData.current} /> Current Job</p>
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
                placeholder="Programme Description"
                onChange={(e) => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form> 
      </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))

