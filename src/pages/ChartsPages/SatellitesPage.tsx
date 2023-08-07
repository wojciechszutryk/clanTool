import 'react-toastify/dist/ReactToastify.css';
import { ChartTypes } from '../../models/inputData.model';
import { useAppSelector } from 'hooks/useAppSelector';
import ChartsForm from './components/Form';
import { StyledChartsPageWarpper, StyledChartsWrapper, StyledFormWrapper } from './styles';
import useGetChartsData from 'pages/ChartsPages/hooks/useGetChartsData';
import ChartsSection from './components/ChartsSection';
import useEnterChartPage from './hooks/useEnterChartPage';
import { useMemo, useState } from 'react';
import { ChartsData } from 'models/data.model';

/**
 * This page is used to display form and charts for selected satellites
 */
function SatellitesPage() {
  const selectedSatelliteNames = useAppSelector((state) => state.app.selectedSatelliteNames);
  const chartsToShow = useAppSelector((state) => state.app.chartsToShow);
  // const [workerState, setWorkerState] = useState<{
  //   calculating: boolean;
  //   warning: string | undefined;
  //   error: string | undefined;
  //   chartsData: ChartsData | undefined;
  // }>({
  //   calculating: false,
  //   warning: undefined,
  //   error: undefined,
  //   chartsData:  undefined
  // });
  const { createChartsData, ...rest } = useGetChartsData();
  useEnterChartPage();

  const handleSubmit = () => {
    const chartsDataToCreate =
      selectedSatelliteNames.length > 1
        ? chartsToShow.filter(
            (chartToShow) =>
              ![ChartTypes.Phase, ChartTypes.Frequency, ChartTypes.FrequencyDrift].includes(
                chartToShow,
              ),
          )
        : chartsToShow;

    createChartsData(selectedSatelliteNames, chartsDataToCreate);
  };

  return (
    <StyledChartsPageWarpper container spacing={{ md: 3 }}>
      <StyledFormWrapper item xs={12} md={5} lg={4}>
        <ChartsForm handleSubmit={handleSubmit} />
      </StyledFormWrapper>
      <StyledChartsWrapper item xs={12} md={7} lg={8}>
        <ChartsSection {...rest} />
      </StyledChartsWrapper>
    </StyledChartsPageWarpper>
  );
}

export default SatellitesPage;
