import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => {
    if(props.alerts !== null && props.alerts.length > 0){
        return props.alerts.map((alert) => {
            return <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}</div>
        })
    } else {
        return (<div></div>)
    }
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);


