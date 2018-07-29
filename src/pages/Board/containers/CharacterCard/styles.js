export const Styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0 57px 0',
        height: 300,
        justifyContent: 'flex-end',
        boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
        borderRadius: '2px',
        position: 'relative',
        backgroundRepeat: 'no-repeat !important',
        backgroundSize: 'cover !important',
        backgroundColor: '#fff',
    },
    containerButton: {
        transition: 'all 0.2s ease-in',
        backgroundColor: '#fff',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)',
        color: '#7c7b7c',
        position: 'absolute',
        top: '-10px',
        right: '-12px',
        '&:focus': {
            boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)'
        }
    },
    inputContainer: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        margin: '0 -7px -60px -7px',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)'
    },
});
