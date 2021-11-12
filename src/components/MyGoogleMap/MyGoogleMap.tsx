import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { Theme } from './styles'
import { createStyles, makeStyles } from '@mui/styles'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import stations from 'assets/StationsBase.json'
import { setMapReference, setSelectedStationName } from '../../state/actions'
import { Button } from '@mui/material'

const useStyles = makeStyles(() => {
    return createStyles({
        infoWindow: {
            color: '#000000',
        },
    })
})

const mapContainerStyle =
    window.innerWidth < 900
        ? {
              width: '100%',
              height: '50vh',
          }
        : {
              width: '100%',
              height: '35vh',
          }

const center = {
    lat: 50.0926,
    lng: 21.3689,
}

const ThemeOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: Theme,
} as google.maps.MapOptions

type MarkerState = {
    lat: number
    lng: number
    height: number
    x: number
    y: number
    z: number
    name: string
    receiverName: string
    antennaName: string
}

const MyGoogleMaps = () => {
    useEffect(() => {
        const markerState = [] as MarkerState[]
        Object.values(stations).forEach((station) => {
            const marker = {} as MarkerState
            marker.lat = station.Latitude
            marker.lng = station.Longitude
            marker.height = station.Height
            marker.x = station.X
            marker.y = station.Y
            marker.z = station.Z
            marker.receiverName = station.Receiver.Name
            marker.antennaName = station.Antenna.Name
            marker.name = station.Name
            markerState.push(marker)
        })
        setMarkers(markerState)
    }, [])
    const classes = useStyles()
    const [markers, setMarkers] = useState<MarkerState[]>([])
    const [selected, setSelected] = useState<MarkerState | null>(null)
    const dispatch = useAppDispatch()

    const mapRef = useRef()
    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map
            dispatch(setMapReference(map))
        },
        [mapRef, dispatch]
    )

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={ThemeOptions}
                onLoad={onMapLoad}
            >
                {markers.map((marker, index) => {
                    if (marker)
                        return (
                            <Marker
                                key={index}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => {
                                    setSelected(marker)
                                }}
                            />
                        )
                    return null
                })}
                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null)
                        }}
                    >
                        <div className={classes.infoWindow}>
                            <h2>{selected.name}</h2>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        setSelectedStationName(selected.name)
                                    )
                                }}
                            >
                                Select
                            </Button>
                            <p>{'latitude' + ' :' + selected.lat + '°'}</p>
                            <p>{'longitude' + ' :' + selected.lng + '°'}</p>
                            <p>{'height' + ' :' + selected.height + 'm'}</p>
                            <p>{'receiver' + ' :' + selected.receiverName}</p>
                            <p>{'antenna' + ' :' + selected.antennaName}</p>
                            <p>{'x' + ' :' + selected.x + 'm'}</p>
                            <p>{'y' + ' :' + selected.y + 'm'}</p>
                            <p>{'z' + ' :' + selected.z + 'm'}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default MyGoogleMaps
