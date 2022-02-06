import { Action } from 'redux'
import * as types from '../constans'
import { charts, TauType } from '../constans/types'

export interface ActionSetStationsNames
    extends Action<typeof types.SET_STATIONS_NAMES> {
    stationsNames: string[]
}

export interface ActionSetSatellitesNames
    extends Action<typeof types.SET_SATELLITES_NAMES> {
    satellitesNames: string[]
}
export interface ActionSetTauType extends Action<typeof types.SET_TAU_TYPE> {
    tauType: TauType
}

export interface ActionSetSelectedStationName
    extends Action<typeof types.SET_SELECTED_STATION_NAME> {
    selectedStationName: string
}

export interface ActionSetSelectedSatelliteNames
    extends Action<typeof types.SET_SELECTED_SATELLITE_NAMES> {
    selectedSatelliteNames: string[]
}

export interface ActionSetMapReference
    extends Action<typeof types.SET_MAP_REFERENCE> {
    mapReference: any
}

export interface ActionSetStartDate
    extends Action<typeof types.SET_START_DATE> {
    startDate: number
}

export interface ActionSetEndDate extends Action<typeof types.SET_END_DATE> {
    endDate: number
}

export interface ActionSetChartsToShow
    extends Action<typeof types.SET_CHARTS_TO_SHOW> {
    chartsToShow: charts[]
}

export interface ActionSetMADMultiply
    extends Action<typeof types.SET_MAD_MULTIPLY> {
    MADMultiply: number
}

export type Actions =
    | ActionSetStationsNames
    | ActionSetSatellitesNames
    | ActionSetSelectedStationName
    | ActionSetSelectedSatelliteNames
    | ActionSetMapReference
    | ActionSetStartDate
    | ActionSetEndDate
    | ActionSetChartsToShow
    | ActionSetMADMultiply
    | ActionSetTauType
