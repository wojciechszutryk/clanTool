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

export type Actions =
    | ActionSetStationsNames
    | ActionSetSatellitesNames
    | ActionSetSelectedStationName
    | ActionSetSelectedSatelliteName
