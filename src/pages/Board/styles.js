export const Styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'fixed',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    fullBodyContainer: {
        marginTop: "70px",
        paddingBottom: '100px',
        overflow: "auto",
        width: '100%',
        paddingTop: '20px'
    }
});