import { styled } from '@mui/material'
import { MapContainer } from 'react-leaflet'

export const StyledMapWrapper = styled('div')({
    width: '95%',
    minWidth: 310,
    height: '400px',
    overflow: 'hidden',
})

export const StyledMapContainer = styled(MapContainer)({
    height: '400px',
    overflow: 'hidden',
})
