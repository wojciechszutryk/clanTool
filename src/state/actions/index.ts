import * as types from '../constans'
import * as actions from './actions.model'
import { ChartTypes, TauTypes } from '../../models/inputData.model'

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

export const setSelectedSatelliteNames = (
    selectedSatelliteNames: string[]
): actions.ActionSetSelectedSatelliteNames => ({
    type: types.SET_SELECTED_SATELLITE_NAMES,
    selectedSatelliteNames,
})

export const setSelectedStationName = (
    selectedStationName: string
): actions.ActionSetSelectedStationName => ({
    type: types.SET_SELECTED_STATION_NAME,
    selectedStationName,
})

export const setTauType = (tauType: TauTypes): actions.ActionSetTauType => ({
    type: types.SET_TAU_TYPE,
    tauType,
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
    chartsToShow: ChartTypes[]
): actions.ActionSetChartsToShow => ({
    type: types.SET_CHARTS_TO_SHOW,
    chartsToShow,
})

export const setMADMultiply = (
    MADMultiply: number
): actions.ActionSetMADMultiply => ({
    type: types.SET_MAD_MULTIPLY,
    MADMultiply,
})
