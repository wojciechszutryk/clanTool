import { Grid, Typography } from '@mui/material'
import satellite from 'assets/images/setellite.svg'
import station from 'assets/images/station.svg'

import 'react-toastify/dist/ReactToastify.css'
import {
    StyledAboutPageWrapper,
    StyledImageWrapper,
    StyledLogo,
} from './styles'

/**
 * The AboutPage component.
 */
function AboutPage() {
    return (
        <StyledAboutPageWrapper container spacing={3} order={{ md: 2 }}>
            <Grid item xs={12} mb={4}>
                <StyledLogo to="/">CLAN TOOL</StyledLogo>
            </Grid>
            <StyledImageWrapper
                item
                xs={12}
                md={6}
                order={{ md: 2 }}
                p={{ md: 2 }}
            >
                <img src={satellite} alt="instructions_Parameters" />
            </StyledImageWrapper>
            <Grid item md={12} order={{ md: 1 }}>
                <Typography mt={2}>
                    Welcome to our website developed exclusively for AGH
                    University in Cracow, dedicated to generating large and
                    interactive charts for satellite and station data analysis.
                    Our website offers powerful and user-friendly tools for
                    visualizing various parameters such as phases, frequencies,
                    Allan deviation, overlapped deviation, Hadamard deviation,
                    and modified deviation.
                </Typography>
                <Typography mt={2}>
                    Our website is designed to provide students, researchers,
                    and professionals with a powerful tool for analyzing and
                    visualizing satellite and station data.
                </Typography>
            </Grid>
            <Grid item md={12} order={{ md: 3 }} spacing={6}>
                <Typography mt={6}>
                    Our interactive charts are designed to provide users with a
                    comprehensive overview of the performance characteristics of
                    satellites and stations. With advanced data visualization
                    techniques, users can easily explore and analyze complex
                    data sets, enabling detailed insights and meaningful
                    interpretations.
                </Typography>
                <Typography mt={2}>
                    One of the key features of our website is the ability to
                    download charts in both CSV and PNG formats. This allows
                    users to export the generated charts for further analysis or
                    use in reports, presentations, or publications. The CSV
                    format provides raw data for further processing, while the
                    PNG format provides high-quality images for visual
                    presentations.
                </Typography>
                <Typography mt={2}>
                    Whether you are a student, researcher, or professional in
                    the field of satellite technology, our website is your go-to
                    resource for generating large and interactive charts of
                    satellite and station data. We are committed to providing
                    the best possible user experience and continuously improving
                    our website to meet the evolving needs of our users.
                </Typography>
                <Typography mt={6}>
                    Thank you for visiting our website, and we look forward to
                    helping you analyze and visualize satellite and station data
                    in a meaningful and efficient way.
                </Typography>
            </Grid>

            <StyledImageWrapper xs={12} md={6} order={{ md: 2 }} p={{ md: 2 }}>
                <img src={station} alt="instructions_Parameters" />
            </StyledImageWrapper>
        </StyledAboutPageWrapper>
    )
}

export default AboutPage
