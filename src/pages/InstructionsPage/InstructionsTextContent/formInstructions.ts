import { Instruction } from './instruction.model'

export const formInstructions: Instruction[] = [
    {
        title: 'Resource Name',
        description:
            'Choose satellite(s) / station from the list. You can choose more than one satellite at once but up to 5. If you choose more satellite, deviation charts will be displayed in one chart.',
        top: 16,
        left: 85,
    },
    {
        title: 'Date and Time',
        description:
            'Choose start date and end date. You can choose date and time. For now, you can choose date from 2014-01-01 to 2021-01-01.',
        top: 33,
        left: 48,
    },
    {
        title: 'Tau Type',
        description:
            'Choose tau type from the list. Tau value will be calculated based on the selected tau type and visible as X Axis on the chart.',
        top: 51,
        left: 28,
    },
    {
        title: 'MAD multiply',
        description:
            'Choose MAD multiply value. This Parameter is used to outlier observations. The higher the value, the more observations will be removed from the chart.',
        top: 51,
        left: 64,
    },
    {
        title: 'Charts to show',
        description:
            'Choose charts to show from the list. Phase, Frequency and Frequency Drift charts will be displayed in separate charts and are available only for single resource. Deviation chart will be displayed in one chart and is available for multiple resources.',
        top: 73,
        left: 70,
    },
    {
        title: 'Calculate Button',
        description:
            'Click on the button to calculate and display charts with selected parameters.',
        top: 91.5,
        left: 70,
    },
]
