import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  navBar:{
    backgroundColor: '#25374a !important',
    position: 'fixed',
  },
  drawer:{
    backgroundColor: '#ebf7fd !important',
    width: '40vw'
  },
  link:{
    backgroundColor: '#25374a !important',
    '& a':{
      color: '#ebf7fd !important',
    }
  },
  linkActive:{
    backgroundColor: '#f4f6f76e !important',
  },
  drawerLink:{
    '& a':{
      color: '#25374a !important',
      textDecoration: 'none',
    }
  },
  drawerLinkActive:{
    backgroundColor: '#25374a !important',
    '& a':{
      color: '#ebf7fd !important',
      textDecoration: 'none',
    }
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: 'var(--colors-tileColor)',
  },
});
