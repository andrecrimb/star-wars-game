import React, {Component} from 'react'
import {connect} from "react-redux";
import {clearToastAlert} from "../../actions";
import Snackbar from '@material-ui/core/Snackbar';

class ToastAlert extends Component {
    handleClose = () => {
        this.props.clearToastAlert()
    };

    render() {
        const {toastAlert: {message, autoHideDuration, open}} = this.props;
        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {toastAlert: state.toastAlert}
};

export default connect(mapStateToProps, {clearToastAlert})(ToastAlert);
