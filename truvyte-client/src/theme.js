
// import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// const DRAWER_WIDTH = 280;

// let theme = createTheme({
//    palette: {
//     mode: 'light',
//     primary: { main: '#006d77' },     // deep teal
//     secondary: { main: '#ff6b6b' },   // coral
//     background: {
//       default: '#f7f9fb',
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#212B36',
//       secondary: '#555763',
//     },
//   },
//   typography: {
//     fontFamily: `'Inter', sans-serif`,
//     h1: { fontWeight: 700, fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' }, '@media (min-width:960px)': { fontSize: '3rem' } },
//     h2: { fontWeight: 600, fontSize: '1.75rem', '@media (min-width:600px)': { fontSize: '2.25rem' }, '@media (min-width:960px)': { fontSize: '2.75rem' } },
//     h3: { fontWeight: 600, fontSize: '1.375rem', '@media (min-width:600px)': { fontSize: '1.75rem' }, '@media (min-width:960px)': { fontSize: '2rem' } },
//     body1: { fontSize: '0.9rem', '@media (min-width:600px)': { fontSize: '1rem' } },
//     body2: { fontSize: '0.8rem', '@media (min-width:600px)': { fontSize: '0.875rem' } },
//     button: { textTransform: 'none', fontWeight: 600 },
//   },
//   shape: { borderRadius: 12 },
//   spacing: 8,
//   transitions: {
//     duration: {
//       standard: 300,
//     },
//   },
//   components: {
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           width: DRAWER_WIDTH,
//           boxSizing: 'border-box',
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           zIndex: 1400,
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
//           padding: '24px',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           padding: '12px 24px',
//         },
//       },
//     },
//   },
//   custom: {
//     drawerWidth: DRAWER_WIDTH,
//   },
// });

//   theme = responsiveFontSizes(theme);
// export default theme;


// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const DRAWER_WIDTH = 280;

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: '#006d77',    // deep teal
      light: '#338c8b',
      dark: '#004f5f',
      contrastText: '#fff',
    },
    secondary: { main: '#ff6b6b' },   // coral
    background: {
      default: '#f7f9fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#212B36',
      secondary: '#555763',
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: { fontWeight: 700, fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' }, '@media (min-width:960px)': { fontSize: '3rem' } },
    h2: { fontWeight: 600, fontSize: '1.75rem', '@media (min-width:600px)': { fontSize: '2.25rem' }, '@media (min-width:960px)': { fontSize: '2.75rem' } },
    h3: { fontWeight: 600, fontSize: '1.375rem', '@media (min-width:600px)': { fontSize: '1.75rem' }, '@media (min-width:960px)': { fontSize: '2rem' } },
    body1: { fontSize: '0.9rem', '@media (min-width:600px)': { fontSize: '1rem' } },
    body2: { fontSize: '0.8rem', '@media (min-width:600px)': { fontSize: '0.875rem' } },
    button: { textTransform: 'none', fontWeight: 600 },
 
    /* ... your existing typography ... */
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  transitions: { duration: { standard: 300 } },
  components: {
    MuiButton: {
      styleOverrides: {
        // Applies to all containedPrimary Buttons
        containedPrimary: {
          backgroundColor: '#006d77',
          '&:hover': {
            backgroundColor: '#004f5f', // primary.dark
          },
        },
        // Applies to all outlinedPrimary Buttons
        outlinedPrimary: {
          borderColor: '#006d77',
          color: '#006d77',
          '&:hover': {
            backgroundColor: 'rgba(0, 109, 119, 0.08)', // translucent teal
            borderColor: '#004f5f',
          },
        },
        // Applies to TextPrimary Buttons
        textPrimary: {
          color: '#006d77',
          '&:hover': {
            backgroundColor: 'rgba(0, 109, 119, 0.04)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#006d77',
          '&:hover': {
            color: '#004f5f',
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { zIndex: 1400 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
          padding: '24px',
        },
      },
    },
     MuiToolbar: {
    styleOverrides: {
      root: {
        // height: 20,
        minHeight: 30,
        '@media (min-width:600px)': {
            minHeight: 30,
        //   height:  30,
        },
      },
    },
  },
MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 8,
      padding: '12px 24px',
      textTransform: 'none',
      fontWeight: 600,
    },
    containedPrimary: {
      backgroundColor: '#006d77',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#004f5f',
        color: '#fff',
      },
    },
    outlinedPrimary: {
      color: '#006d77',
      borderColor: '#006d77',
      '&:hover': {
        backgroundColor: 'rgba(0, 109, 119, 0.08)',
        color: '#006d77',
        borderColor: '#004f5f',
      },
    },
    textPrimary: {
      color: '#006d77',
      '&:hover': {
        color: '#006d77',
        backgroundColor: 'rgba(0, 109, 119, 0.04)',
      },
    },
  },
},
MuiListItemIcon: {
  styleOverrides: {
    root: {
      minWidth: '36px',
      color: '#006d77',
    },
  },
},


    // ... other overrides ...
  },
  custom: { drawerWidth: DRAWER_WIDTH },
});

theme = responsiveFontSizes(theme);
export default theme;
