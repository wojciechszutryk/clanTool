import {Grid, Typography,Box } from '@mui/material'
import React from 'react'
import instructionParameters from 'assets/images/instructions_Parameters.png';
import instructionChart from 'assets/images/instructions_Chart.png';
import 'react-toastify/dist/ReactToastify.css'
import './styles.css';

const InstructionsPage = () => {

    return (
        <Grid container spacing={{ md: 3 }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '@media only screen and (min-width: 900px)': {
                    display: 'flex',
                    flexDirection: 'row',
                },
            }}>
                <img src={instructionParameters} alt="instructions_Parameters" />
                <Box sx={{flexGrow: 1}}>
                    <Typography variant={'h2'} sx={{fontSize: 30, color: '#25374A', textAlign: 'center'}}>Charts parameters</Typography>
                    <ul>
                        <li><span>1</span>- wybór satelit/stacji ....</li>
                        <li><span>2</span>- wybór dat - zakres ....</li>
                        <li><span>3</span>- wybór typu tau -  ....</li>
                        <li><span>4</span>- wybór typu mad -  ....</li>
                        <li><span>5</span>- wybór typów wykresów -  opis każdego?....</li>
                    </ul>
                </Box>
            </Grid>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '@media only screen and (min-width: 900px)': {
                    display: 'flex',
                    flexDirection: 'row',
                },
            }}>
                <Box sx={{flexGrow: 1}}>
                    <Typography variant={'h2'} sx={{fontSize: 30, color: '#25374A', textAlign: 'center'}}>Chart</Typography>
                    <ul>
                        <li><span>1</span> - tytuł ....</li>
                        <li><span>2</span> - legenda ....</li>
                        <li><span>3</span> - przybliżanie oddalanie -  ....</li>
                        <li><span>4</span> - przewijanie -  ....</li>
                        <li><span>5</span> - osie....</li>
                        <li><span>6</span> - szumy....</li>
                        <li><span>7</span> - zapis png....</li>
                        <li><span>8</span> - zapis csv....</li>
                    </ul>
                </Box>
                <img src={instructionChart} alt="instructions_Chart" />
            </Grid>
        </Grid>
    )
}

export default InstructionsPage
