import { createTheme } from '@mui/material/styles'
import VarelaRound from './Fonts/VarelaRound-Regular.ttf'

const varelaRound = {
  fontFamily: 'VarelaRound-Regular',
  fontStyle: 'Regular',
  fontDisplay: 'swap',
  src: `
   local('VarelaRound-Regular'),
   url(./Fonts/VarelaRound-Regular.ttf) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#009688',
      light: '#26a69a',
      dark: '#00796b',
      contrastText: '#f0f5f4',
    },
    secondary: {
      main: '#ffb300',
      light: '#ffca28',
      dark: '#ffa000',
      contrastText: '#303030',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#ff9800',
    },
    error: {
      main: '#e57373',
      light: '#ef9a9a',
      dark: '#ef5350',
    },
    text: {
      primary: '#005046',
    },
  },
  typography: {
    fontFamily: [varelaRound],
    fontWeightLight: 200,
    fontWeightRegular: 200,
    fontWeightMedium: 200,
    fontWeightBold: 800,
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
      fontSize: '1.6rem',
    },
    subtitle1: {
      fontWeight: 800,
    },
  },
  transitions: {
    duration: {
      Long: 1000,
    },
  },
})

export default Theme
