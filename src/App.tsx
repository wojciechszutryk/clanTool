import React from 'react'
import './App.css'
import {
    DatePicker,
    DrawChart,
    MyGoogleMaps,
    SatelliteSelect,
    StationSelect,
} from './components'
import { toast, ToastContainer } from 'react-toastify/dist'
import InfoIcon from '@mui/icons-material/Info';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    toast.configure()
    return (
        <div>
            <StationSelect />
            <SatelliteSelect system={'G'}/>
            <SatelliteSelect system={'R'}/>
            <SatelliteSelect system={'C'}/>
            <SatelliteSelect system={'E'}/>
            <SatelliteSelect system={'J'}/>
            <DatePicker startEnd={'start'}/>
            <DatePicker startEnd={'end'}/>
            <MyGoogleMaps />
            <DrawChart />
            <ToastContainer icon={<InfoIcon color="primary" />} />
        </div>
    )
}

export default App
