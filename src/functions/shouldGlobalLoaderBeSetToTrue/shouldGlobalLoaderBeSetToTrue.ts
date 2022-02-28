import store from '../../state/store'

export default function shouldGlobalLoaderBeSetToTrue(){
    const selectedSatelliteNames = store.getState().app.selectedSatelliteNames;
    const selectedStationName = store.getState().app.selectedStationName;
    const chartsToShow = store.getState().app.chartsToShow;

    return !!((selectedSatelliteNames.length || selectedStationName.length) && chartsToShow.length)
}