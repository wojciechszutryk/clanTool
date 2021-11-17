import * as types from '../constans'
import * as actions from '../actions/actionsInterfaces'

export const setSatellitesNames = (
    satellitesNames: string[]
): actions.ActionSetSatellitesNames => ({
    type: types.SET_SATELLITES_NAMES,
    satellitesNames,
})

export const setStationsNames = (
    stationsNames: string[]
): actions.ActionSetStationsNames => ({
    type: types.SET_STATIONS_NAMES,
    stationsNames,
})

export const setSelectedSatelliteName = (
    selectedSatelliteName: string
): actions.ActionSetSelectedSatelliteName => ({
    type: types.SET_SELECTED_SATELLITE_NAME,
    selectedSatelliteName,
})

export const setSelectedStationName = (
    selectedStationName: string
): actions.ActionSetSelectedStationName => ({
    type: types.SET_SELECTED_STATION_NAME,
    selectedStationName,
})

export const setMapReference = (
    mapReference: any
): actions.ActionSetMapReference => ({
    type: types.SET_MAP_REFERENCE,
    mapReference,
})
