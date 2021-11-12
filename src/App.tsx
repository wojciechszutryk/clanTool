import React from 'react'
import './App.css'
import { DrawChart, SatelliteSelect, StationSelect } from './components'

function App() {
    return (
        <div>
            <StationSelect />
            <SatelliteSelect />
            <DrawChart />
        </div>
    )
}

export default App
