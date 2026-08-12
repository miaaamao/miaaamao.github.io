import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  typography: {
    fontFamily:
      "'Geist', ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
  },
  palette: {
    primary: { main: '#0a0a0a' },
    text: { primary: '#0a0a0a', secondary: '#9f9f9f' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiTooltip: {
      defaultProps: { arrow: false, enterDelay: 350 },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#0a0a0a',
          color: '#fff',
          fontSize: '0.7rem',
          letterSpacing: '0.02em',
          padding: '6px 10px',
          borderRadius: 8,
        },
      },
    },
  },
});
