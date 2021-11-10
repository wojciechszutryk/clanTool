import React, {useEffect} from 'react';
import './App.css';
import {satelliteStationsBaseToNames} from "./functions/sateliteStationsBaseToNames";
import {useAppSelector} from "./functions/hooks/useAppSelector";
import {useAppDispatch} from "./functions/hooks/useAppDispach";
import {setStationsSatellitesNames} from "./state/actions";

function App() {
  const dispatch = useAppDispatch()
  const names = useAppSelector((state) => state.app)
  useEffect(()=>{
    satelliteStationsBaseToNames().then(r => dispatch(setStationsSatellitesNames(r)))
  },[])
  return (
    <div className="App">

    </div>
  );
}

export default App;
