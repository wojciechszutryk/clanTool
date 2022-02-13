import InfoIcon from '@mui/icons-material/Info'
import { Box, Container } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify/dist'
import { Footer } from './components/Footer'
import { useStyles } from './styles'
import { Header } from './components/Header'
import SatellitesPage from './pages/SatellitesPage'

// import convertRinexDataIntoJSON from './functions/convertRinexDataIntoJSON/convertRinexDataIntoJSON'
// convertRinexDataIntoJSON('R20').then((r) => console.log(r))

function App() {
    toast.configure()
    const classes = useStyles();
    return (
        <>
            <Header/>
            <Box className={classes.wrapper}>
                <Container sx={{marginTop: '56px', maxWidth: '1600px', padding: '50px 0'}}>
                    <Routes>
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route path="/" element={<SatellitesPage/>} />
                        <Route path="satellites" element={<SatellitesPage/>} />
                        <Route path="stations" element={<SatellitesPage/>} />
                        <Route path="instructions" element={<SatellitesPage/>} />
                        <Route path="about" element={<SatellitesPage/>} />
                    </Routes>
                </Container>
            </Box>
            <ToastContainer icon={<InfoIcon color="primary" />} />
            <Footer/>
        </>
    )
}

export default App
