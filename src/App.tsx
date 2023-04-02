import InfoIcon from '@mui/icons-material/Info'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify/dist'
import { Footer } from './components/Footer'
import AboutPage from './pages/AboutPage'
import InstructionsPage from './pages/InstructionsPage'
import StationsPage from './pages/StationsPage'
import { StyledAppContent, StyledAppWrapper } from './styles'
import { Header } from './components/Header'
import SatellitesPage from './pages/SatellitesPage'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    toast.configure()
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <StyledAppWrapper>
                <StyledAppContent>
                    <Routes>
                        <Route
                            path="*"
                            element={<Navigate to="/satellites" replace />}
                        />
                        <Route path="satellites" element={<SatellitesPage />} />
                        <Route path="stations" element={<StationsPage />} />
                        <Route
                            path="instructions"
                            element={<InstructionsPage />}
                        />
                        <Route path="about" element={<AboutPage />} />
                    </Routes>
                </StyledAppContent>
            </StyledAppWrapper>
            <ToastContainer icon={<InfoIcon color="primary" />} />
            <Footer />
        </LocalizationProvider>
    )
}

export default App
