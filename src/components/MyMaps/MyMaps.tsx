import React, { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import stations from '../../assets/StationsBase.json'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { Box, Button } from '@mui/material'
import { setSelectedStationName } from '../../state/actions'

const MyMaps = () => {
    const dispatch = useAppDispatch()
    
    const markers = useMemo(() => {
        return Object.values(stations).map((station) => (
            <Marker key={station.Name} position={[station.Latitude, station.Longitude]}>
                <Popup>
                    <h2>{station.Name}</h2>
                    <Button
                        onClick={() => {
                            dispatch(setSelectedStationName(station.Name))
                        }}
                    >
                        Select
                    </Button>
                    <p>{'latitude: ' + station.Latitude + '°'}</p>
                    <p>{'longitude: ' + station.Longitude + '°'}</p>
                    <p>{'height: ' + station.Height + 'm'}</p>
                    <p>{'receiver: ' + station.Receiver.Name}</p>
                    <p>{'antenna: ' + station.Antenna.Name}</p>
                    <p>{'x: ' + station.X + 'm'}</p>
                    <p>{'y: ' + station.Y + 'm'}</p>
                    <p>{'z: ' + station.Z + 'm'}</p>
                </Popup>
            </Marker>
        ))
    }, [dispatch])

    return (
        <Box id="map" sx={{ m: 1, height: '400px', overflow: 'hidden' }}>
            <MapContainer
                style={{ height: '400px', overflow: 'hidden' }}
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        </Box>
    )
}

export default MyMaps
