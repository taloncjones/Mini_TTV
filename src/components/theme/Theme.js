import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: grey,
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    lineHeight: '1.2',
    color: '#fff',
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#363636',
        '& *': { color: grey[500] },
      },
    },
    MuiLink: {
      root: {
        textDecoration: 'none!important',
      }
    },
  },
})

export default theme;