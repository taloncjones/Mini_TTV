import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: indigo,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#363636',
        '& *': { color: 'rgba(255, 255, 255, 0.7)' },
      },
    },
  },
})

export default theme;