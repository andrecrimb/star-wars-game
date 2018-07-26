export const Styles = theme => ({
    root: {
        zIndex: '9',
        boxShadow: 'rgba(28, 142, 153, 0.3) 0px 6px 20px 0px',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuButton: {
        marginLeft: '12px',
        marginRight: '16px',
    },
    navIcon: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        height: '32px',
        marginRight: '30px',
        marginLeft: '18px',
    },
    flex: {
        flex: 1,
        // textTransform: 'capitalize'
    },
    loading: {
        display: 'none'
    }
});

