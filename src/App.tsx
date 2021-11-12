import React from 'react'
import './App.css'
import {
    DrawChart,
    MyGoogleMaps,
    SatelliteSelect,
    StationSelect,
} from './components'

function App() {
    return (
        <div>
            <StationSelect />
            <SatelliteSelect />
            <MyGoogleMaps />
            <DrawChart />
        </div>
    )
}

export default App
