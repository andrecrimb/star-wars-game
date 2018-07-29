export const Styles = theme => ({
    simpleProgressCounterFullContainer: {
        position: 'relative',
        width: '54px',
        height: '54px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    progressTitle: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#fff',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    progressCircle: {
        width: '54px !important',
        height: '54px !important',
    },
    inactive: {
      color: 'gray',
      opacity: '0.5'
    }
});