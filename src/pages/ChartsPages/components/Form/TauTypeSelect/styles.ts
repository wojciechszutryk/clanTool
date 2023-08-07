import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  powerOf: {
    position: 'relative',
    '& span': {
      position: 'absolute',
      fontSize: '60%',
      transform: 'translateY(-30%)',
    },
  },
});
