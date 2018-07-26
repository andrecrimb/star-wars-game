import React, {Component} from 'react'
import {Styles} from "./styles";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {AccountCircle, Menu as MenuIcon} from '@material-ui/icons';
import {compose} from 'redux'
import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    LinearProgress
} from '@material-ui/core';
import {connect} from 'react-redux';
import {toggleSideMenu, editProfileModal} from '../../actions/index';
import {withRouter} from 'react-router-dom'
import {environmentDev} from "../../environments";

class AppTopBar extends Component {
    handleDrawerToggle = () => {
        this.props.toggleSideMenu();
        
    };

    editProfile = () => {
        this.props.editProfileModal();
    }

    render() {
        const {classes} = this.props;

        return (
            <AppBar position="absolute" className={classes.root}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerToggle}
                        className={classNames(classes.navIconHide, classes.menuButton)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img className={classes.navIcon} src="images/navbar.png" alt=""/>
                    <Typography variant="title" className={classes.flex} color="inherit" noWrap>
                        {this.props.title}
                    </Typography>
                    <IconButton aria-haspopup="true" onClick={this.editProfile} color="inherit">
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
                <LinearProgress
                    color="secondary"
                    className={classNames(
                        this.props.loading === 0 ? classes.loading : ''
                    )}
                />
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.systemSettings.pageTitle,
        loading: state.systemSettings.countLoadingRequest
    }
};

const app = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {toggleSideMenu,editProfileModal,app})
)(AppTopBar);
