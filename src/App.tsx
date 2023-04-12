import InfoIcon from '@mui/icons-material/Info'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify/dist'
import { Footer } from './components/Footer'
import { StyledAppContent, StyledAppWrapper } from './styles'
import { Header } from './components/Header'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const SatellitesPage = lazy(() => import('./pages/ChartsPages/SatellitesPage'))
const StationsPage = lazy(() => import('./pages/ChartsPages/StationsPage'))
const InstructionsPage = lazy(() => import('./pages/InstructionsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function App() {
    toast.configure()
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <StyledAppWrapper>
                <StyledAppContent>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Navigate to={'/about'} />} />
                            <Route
                                path="satellites"
                                element={
                                    <Suspense fallback={null}>
                                        <SatellitesPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="stations"
                                element={
                                    <Suspense fallback={null}>
                                        <StationsPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="instructions"
                                element={
                                    <Suspense fallback={null}>
                                        <InstructionsPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="about"
                                element={
                                    <Suspense fallback={null}>
                                        <AboutPage />
                                    </Suspense>
                                }
                            />
                        </Route>
                    </Routes>
                </StyledAppContent>
            </StyledAppWrapper>
            <ToastContainer icon={<InfoIcon color="primary" />} />
            <Footer />
        </LocalizationProvider>
    )
}

export default App
