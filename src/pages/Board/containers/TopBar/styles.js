export const Styles = theme => ({
    root: {
        zIndex: '9',
        boxShadow: 'none',
    },
    toolbar: {
        minHeight: '116px',
        marginBottom: '40px',
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
    subtitleText: {
        margin: 0,
        fontSize: 'large',
        fontWeight: 400,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        lineHeight: '200%'
    }
});

