import {
    StyledBottomSection,
    StyledLink,
    StyledLinks,
    StyledLogo,
    StyledLogoLink,
    StyledWrapper,
} from './styles'

/**
 * This is a Footer component. It contains links to the AGH University of Science and Technology and the author of the project.
 * @returns 
 */
export const Footer = (): JSX.Element => {
    return (
        <StyledWrapper>
            <StyledLogo>
                <StyledLogoLink to="/">CLAN TOOL</StyledLogoLink>
            </StyledLogo>
            <StyledLinks>
                <StyledLink href="https://www.google.pl/">
                    Akademia Górniczo-Hutnicza im. Stanisława Staszica w
                    Krakowie
                </StyledLink>
                <StyledLink href="https://geod.agh.edu.pl/index.php?lang=pl">
                    Wydział Geodezji Górniczej i Inżynierii Środowiska
                </StyledLink>
                <StyledLink href="https://home.agh.edu.pl/~zgk/">
                    Katedra Geodezji Zintegrowanej i Kartografii
                </StyledLink>
            </StyledLinks>
            <StyledBottomSection>
                <p>
                    Designed by -{' '}
                    <StyledLink href="https://www.google.pl/">
                        Wojciech Szutryk
                    </StyledLink>
                </p>
            </StyledBottomSection>
        </StyledWrapper>
    )
}
