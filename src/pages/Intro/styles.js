export const Styles = theme => ({
    loginIndex: {
        backgroundSize: 'cover',
        backgroundImage: 'url("images/background.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    cardLogin: {
        maxWidth: 550,
        margin: 'auto',
        marginTop: '7%',
        paddingBottom: '5px',
        '&:hover': {
            boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        }
    },
    formHeader: {
        textAlign: 'center',
        margin: '-28px -24px 15px',
        padding: '22px 0 0 0'
    },
    imageHeader: {
        width: '170px',
    },
    playButton: {
        width: '100%',
        maxWidth: '300px',
    },
    actionContainer: {
      textAlign: 'center'
    },
    flatBtn: {
        color: '#868686'
    },
    scoreIcon: {
        marginRight: '16px',
        marginTop: '-4px'
    },
    rulesContainer: {
        textAlign: 'left',
        marginBottom: 20
    },
    root: {
        maxHeight: '500px',
        overflow: 'auto'
    },
    titleIntro: {
        textAlign: 'center',
        lineHeight: '150%',
        fontWeight: '400',
        marginTop: 0
    }
});