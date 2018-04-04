import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

function Spinner(props){
    return (
        props.loading && (
            <div className="loading">
                <ClipLoader
                color={'#2e7c31'}
                loading={props.loading}
                />
            </div>
        )
    )
}

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Spinner