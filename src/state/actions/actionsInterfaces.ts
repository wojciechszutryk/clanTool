// export interface ActionSetStationsSatellitesNames{
//     type: string;
//     payload: string[]
// }
//
// export interface ActionSetSelectedStationsSatellitesName{
//     type: string;
//     payload: string
// }

import {Action} from "redux";
import * as types from '../constans'

export interface ActionSetStationsSatellitesNames extends Action<typeof types.SET_STATIONS_SATELLITES_NAMES> {
    stationsSatellitesNames: string[]
}

export interface ActionSetSelectedStationsSatellitesName extends Action<typeof types.SET_SELECTED_STATIONS_SATELLITES_NAME> {
    selectedStationsSatellitesName: string
}

export type Actions = ActionSetStationsSatellitesNames | ActionSetSelectedStationsSatellitesName