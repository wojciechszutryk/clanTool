import { Action } from 'redux'
import * as types from '../constans'

export interface ActionSetStationsNames
    extends Action<typeof types.SET_STATIONS_NAMES> {
    stationsNames: string[]
}

export interface ActionSetSatellitesNames
    extends Action<typeof types.SET_SATELLITES_NAMES> {
    satellitesNames: string[]
}

export interface ActionSetSelectedStationName
    extends Action<typeof types.SET_SELECTED_STATION_NAME> {
    selectedStationName: string
}

export interface ActionSetSelectedSatelliteName
    extends Action<typeof types.SET_SELECTED_SATELLITE_NAME> {
    selectedSatelliteName: string
}

export interface ActionSetMapReference
    extends Action<typeof types.SET_MAP_REFERENCE> {
    mapReference: any
}

export interface ActionSetStartDate
    extends Action<typeof types.SET_START_DATE> {
    startDate: number
}

export interface ActionSetEndDate
    extends Action<typeof types.SET_END_DATE> {
    endDate: number
}

export type Actions =
    | ActionSetStationsNames
    | ActionSetSatellitesNames
    | ActionSetSelectedStationName
    | ActionSetSelectedSatelliteName
    | ActionSetMapReference
    | ActionSetStartDate
    | ActionSetEndDate
