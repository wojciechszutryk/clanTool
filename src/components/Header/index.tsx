import { Container, Toolbar } from '@mui/material';
import { StyledNavBar } from './styles';
import DesktopContent from './DesktopContent';
import MobileContent from './MobileContent';

export const pages = [
  { url: 'satellites', name: 'Satellites' },
  { url: 'stations', name: 'Stations' },
  { url: 'instructions', name: 'Instructions' },
  { url: 'about', name: 'About' },
];

/**
 * The header component. It contains the navigation bar and renders different content depending on the screen size.
 */
export const Header = (): JSX.Element => {
  return (
    <StyledNavBar>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MobileContent />
          <DesktopContent />
        </Toolbar>
      </Container>
    </StyledNavBar>
  );
};
