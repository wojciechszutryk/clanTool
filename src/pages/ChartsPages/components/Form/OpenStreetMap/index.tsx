import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import stations from 'assets/StationsBase.json'
import { Button } from '@mui/material'
import { setSelectedStationName } from 'state/actions'
import { useAppDispatch } from 'hooks/useAppDispach'
import { StyledMapWrapper } from './styles'

/**
 * This component is responsible for rendering map (leaflet library) with markers for stations. It also renders popup with station data. When user clicks on button in popup, station name is set as selectedStationName in redux store.
 */
const OpenStreetMap = () => {
    const dispatch = useAppDispatch()

    return (
        <StyledMapWrapper id="map">
            <MapContainer
                style={{ height: '400px', overflow: 'hidden' }}
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {Object.values(stations).map((station) => (
                    <Marker
                        key={station.Name}
                        position={[station.Latitude, station.Longitude]}
                    >
                        <Popup>
                            <h2>{station.Name}</h2>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        setSelectedStationName(station.Name)
                                    )
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
                ))}
            </MapContainer>
        </StyledMapWrapper>
    )
}

export default OpenStreetMap
