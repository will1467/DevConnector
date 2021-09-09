import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = props => {
    const exp = props.experience;


    const experiences = exp.map((experience) => {
        return (
            <tr key={experience.id}>
                <td>
                    {experience.company}
                </td>
                <td className="hide-sm">
                    {experience.title}
                </td>
                <td>
                    <Moment format="YYYY/MM/DD">{experience.from}</Moment> - {experience.to === null ? 'Now' : <Moment format="YYYY/MM/DD" >{experience.to}</Moment> }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => props.deleteExperience(experience._id)}>Delete</button>
                </td>
            </tr>
        )

    });
    return (
        <Fragment>
            <h2 className="my-2"> Experience </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience : PropTypes.array.isRequired,
    deleteExperience : PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience);
