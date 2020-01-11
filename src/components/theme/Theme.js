import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    },
    secondary: grey,
    text: {
      primary: '#fff',
      secondary: '#ccc',
    }
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
    }
  },
})

export default theme;