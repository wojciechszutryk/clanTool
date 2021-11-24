import * as types from '../constans'
import { Actions } from '../actions/actionsInterfaces'
import { Reducer } from 'redux'

interface State {
    satellitesNames: string[]
    stationsNames: string[]
    selectedSatelliteName: string
    selectedStationName: string
    mapReference: any
    startDate: number
    endDate: number
}

const initialState: State = {
    stationsNames: [],
    satellitesNames: [],
    selectedSatelliteName: '',
    selectedStationName: '',
    mapReference: null,
    startDate: +new Date(2014,0,1,0,0,0,0),
    endDate: +new Date(2014,0,7,0,0,0,0),
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
        case types.SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate,
            }
        case types.SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate,
            }
        default:
            return state
    }
}

export default reducer
