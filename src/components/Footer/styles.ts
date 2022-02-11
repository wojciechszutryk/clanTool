import { makeStyles } from '@mui/styles'


export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent:'space-between',
    zIndex: 99,
    height: 300,
    width: '100%',
    backgroundColor: '#25374a !important',
    boxShadow: '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
    '@media only screen and (min-width: 1200px)': {
      height: 200,
    },
  },

  logo: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid #ebf7fd`,
  },
  logoLink: {
    color: '#ebf7fd !important',
    textDecoration: 'none !important',
    fontSize: '1.25rem',
    fontFamily: "Roboto , Helvetica , Arial , sans-serif",
    fontWeight: 500,
  },

  links: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 24,
    '@media only screen and (min-width: 992px)': {
      // paddingLeft: 100,
    },
    '@media only screen and (min-width: 1200px)': {
      // paddingLeft: 200,
      flexDirection: 'row',
    },
  },
  link:{
    color: '#ebf7fd !important',
    textDecoration: 'none !important'
  },

  bottomSection: {
    height: 45,
    lineHeight: '45px',
    width: '100%',
    textAlign: 'center',
    '& p': {
      marginTop: 0,
      marginBottom: 0,
      color: 'white',
    },
  },
});
