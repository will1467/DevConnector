import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = props => {
    const exp = props.experience;

    const experiences = exp.map((experience) => {
        return (
            <td key={experience.id}>
                <td>
                    {experience.company}
                </td>
                <td className="hide-sm">
                    {experience.title}
                </td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.form}</Moment> - {experience.to === null ? 'Now' : <Moment format="YYYY/MM/DD" >{experience.from}</Moment> }
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </td>
        )

    });
    return (
        <Fragment>
            <h2 className="my-2"> </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th className="hide-sm"></th>
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
}

export default Experience;
