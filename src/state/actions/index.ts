import * as types from '../constans'
import * as actions from '../actions/actionsInterfaces'
import { charts } from '../constans/types'

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

export const setStartDate = (
    startDate: number
): actions.ActionSetStartDate => ({
    type: types.SET_START_DATE,
    startDate,
})

export const setEndDate = (endDate: number): actions.ActionSetEndDate => ({
    type: types.SET_END_DATE,
    endDate,
})

export const setChartsToShow = (
    chartsToShow: charts[]
): actions.ActionSetChartsToShow => ({
    type: types.SET_CHARTS_TO_SHOW,
    chartsToShow,
})
