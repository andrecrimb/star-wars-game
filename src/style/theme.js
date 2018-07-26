import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff8f40',
            main: '#ff8f40',
            dark: '#ff8f40',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffae01',
            main: '#ffae01',
            dark: '#ffae01',
            contrastText: '#fff',
        },
        third: {
            light: '#3D4A4B',
            main: '#3D4A4B',
            dark: '#3D4A4B',
            contrastText: '#fff',
        },
        background: {
            default: '#f2f2f2'
        },
        danger: {
            default: '#ff654d'
        }
    },
});