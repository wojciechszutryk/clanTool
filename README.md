### CLAN TOOL

## Project Status

Done.

## Reflection

An application created for scientific and research purposes at the request of agh

## About

The project is dedicated to generating large and interactive charts for satellite and station data analysis. Website offers powerful and user-friendly tools for visualizing various parameters such as
phases, frequencies, Allan deviation, overlapped deviation, Hadamard deviation, and
modified deviation. Interactive charts are designed to provide users with a comprehensive overview of the
performance characteristics of satellites and stations. With advanced data visualization
techniques, users can easily explore and analyze complex data sets, enabling detailed
insights and meaningful interpretations.

One of the key features of our website is the ability to download charts in both CSV and
PNG formats. This allows users to export the generated charts for further analysis or use
in reports, presentations, or publications. The CSV format provides raw data for further
processing, while the PNG format provides high-quality images for visual presentations.

## Technical stack

The application is built using a stack that combines React with TypeScript and leverages Web Workers to achieve maximum performance, especially when handling substantial datasets, reaching up to 100MB in size, for visualization on canvas charts.

## Project Screen Shot(s) && Demo video

https://user-images.githubusercontent.com/72247608/231422303-53cf99da-8ebb-4d7f-96c3-8a0d258329c5.mp4

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Upload Data:

Prepare required data (src/assets/SatelliteBase.ts, src/assets/StationSatelliteData.ts) in format defined in src/models/data.model.ts/PhasePoint and paste it to public/data, calling files: C06.json, C07.json ... BRUX.json ...

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`  
