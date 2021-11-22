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
            <SatelliteSelect system={'G'}/>
            <SatelliteSelect system={'R'}/>
            <SatelliteSelect system={'C'}/>
            <SatelliteSelect system={'E'}/>
            <SatelliteSelect system={'J'}/>
            <MyGoogleMaps />
            <DrawChart />
        </div>
    )
}

export default App
