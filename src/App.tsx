import React, {useEffect, useMemo} from 'react';
import './App.css';
import {satelliteStationsBaseToNames} from "./functions/sateliteStationsBaseToNames";
import {useAppSelector} from "./functions/hooks/useAppSelector";
import {useAppDispatch} from "./functions/hooks/useAppDispach";
import {setStationsSatellitesNames} from "./state/actions";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function App() {
  const dispatch = useAppDispatch()
  const names = useAppSelector((state) => state.app.stationsSatellitesNames)
  useEffect(()=>{
    satelliteStationsBaseToNames().then(r => dispatch(setStationsSatellitesNames(r)))
  },[dispatch])
    const selectNameOptions = useMemo(() =>{
        return names.map((name:string) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
        ))
    },[names])
  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Station or Satellite</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
        >
            {selectNameOptions}
        </Select>
      </FormControl>
  );
}

export default App;
