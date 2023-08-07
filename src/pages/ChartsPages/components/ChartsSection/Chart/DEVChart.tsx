import { memo, useEffect, useMemo, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { ChartPoint, ChartsData } from 'models/data.model';
import {
  StyledChartActionsWrapper,
  StyledChartBox,
  StyledSaveToCSVButton,
  StyledSaveToImageButton,
  StyledWrapper,
} from './styles';
import useChartFileName from './hooks/useChartFileName';
import useSaveChartToImage from './hooks/useSaveChartToImage';
import useInitializeDEVChart from './hooks/useInitializeDEVChart';
import { ChartXY, PointMarker, UIBackground, PointLineSeries } from '@arction/lcjs';
import ClockNoises from '../ClockNoises';
import { CHART_ZOOM_FIX } from 'models/chartZoom.const';

/**
 * This component is responsible for rendering DEV chart. Chart contains data from all selected DEV charts.
 */
const DEVChart = ({ data, id }: { data: ChartsData; id: string }) => {
  const filename = useChartFileName({ id });
  const chartRef = useRef<
    | {
        chart: ChartXY<PointMarker, UIBackground>;
        series: PointLineSeries[];
      }
    | undefined
  >(undefined);
  const handleChartSaveToImage = useSaveChartToImage({ filename, chartRef });

  useInitializeDEVChart(id, chartRef, data);

  const csvData = useMemo(() => {
    if (data.size === 0) return [];
    const csvArray: (string | number)[][] = [];
    const tauValues = Array.from(data.values())[0].map((point) => point.x);
    csvArray.push(['tau', ...tauValues]);

    data.forEach((chartData, key) => {
      const devValues = chartData.map((chartData) => chartData.y / CHART_ZOOM_FIX);
      csvArray.push([key, ...devValues]);
    });

    return csvArray;
  }, [data]);

  return (
    <StyledWrapper>
      <StyledChartBox id={id} />
      <div id={id}></div>
      <ClockNoises data={data} />
      <StyledChartActionsWrapper>
        <StyledSaveToImageButton variant={'outlined'} onClick={handleChartSaveToImage}>
          Save chart to .png file
        </StyledSaveToImageButton>
        <StyledSaveToCSVButton variant={'outlined'}>
          <CSVLink data={csvData} filename={filename + '.csv'} target='_blank'>
            Save chart to .CSV file
          </CSVLink>
        </StyledSaveToCSVButton>
      </StyledChartActionsWrapper>
    </StyledWrapper>
  );
};

export default memo(DEVChart);
