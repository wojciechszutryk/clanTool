import * as types from '../constans'
import { Actions } from '../actions/actionsInterfaces'
import { Reducer } from 'redux'

interface State {
    satellitesNames: string[]
    stationsNames: string[]
    selectedSatelliteName: string
    selectedStationName: string
    mapReference: any
}

const initialState: State = {
    stationsNames: [],
    satellitesNames: [],
    selectedSatelliteName: '',
    selectedStationName: '',
    mapReference: null,
}

const reducer: Reducer<State, Actions> = (
    state = initialState,
    action
): State => {
    switch (action.type) {
        case types.SET_SATELLITES_NAMES:
            return {
                ...state,
                satellitesNames: action.satellitesNames,
            }
        case types.SET_STATIONS_NAMES:
            return {
                ...state,
                stationsNames: action.stationsNames,
            }
        case types.SET_SELECTED_STATION_NAME:
            return {
                ...state,
                selectedStationName: action.selectedStationName,
                selectedSatelliteName: '',
            }
        case types.SET_SELECTED_SATELLITE_NAME:
            return {
                ...state,
                selectedSatelliteName: action.selectedSatelliteName,
                selectedStationName: '',
            }
        case types.SET_MAP_REFERENCE:
            return {
                ...state,
                mapReference: action.mapReference,
            }
        default:
            return state
    }
}

export default reducer
