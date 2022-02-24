import {Grid } from '@mui/material'
import React from 'react'
import instructionParameters from 'assets/images/instructions_Parameters.png';
import 'react-toastify/dist/ReactToastify.css'


function InstructionsPage() {

    return (
        <Grid container spacing={{ md: 3 }}>
            <Grid item>
                {instructionParameters}
                <img src="\assets\images\instructions_Parameters.png" alt="instructions_Parameters" />
            </Grid>
             <Grid item>
                <img src="../../assets/images/instructions_Chart.png" alt="instructions_Chart" />
            </Grid>
        </Grid>
    )
}

export default InstructionsPage
