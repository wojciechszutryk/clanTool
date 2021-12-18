import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { RingLoader } from 'react-spinners'

const useStyles = makeStyles({
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 1000000,
    },
    text:{
        fontSize: 30,
        marginTop: 29,
        marginLeft: 20,
    }
})

const GlobalLoader: React.FC = () => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <RingLoader size={100}/>
            <Typography className={classes.text}>Loading</Typography>
        </Box>
    )
}

export default GlobalLoader

