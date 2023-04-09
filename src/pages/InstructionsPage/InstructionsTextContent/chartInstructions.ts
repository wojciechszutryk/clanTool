import { Instruction } from './instruction.model'

export const chartInstructions: Instruction[] = [
    {
        title: 'Title',
        description: 'Chart title based on selected resources and chart type',
        top: 4,
        left: 40,
    },
    {
        title: 'Legend',
        description:
            'Chart legend (only for deviation charts)- it shows which resource is displayed on the chart. You can hide or show resources by clicking on the legend. Legend position can be adjusted by dragging it to the desired position.',
        top: 41,
        left: 30,
    },
    {
        title: 'Axes',
        description:
            'Chart axes. You can zoom in and out using mouse wheel, you can olso mark data range by dragging mouse over the axes.',
        top: 55,
        left: 15,
    },
    {
        title: 'Chart content',
        description:
            'Chart content. You can zoom in and out using mouse wheel. You can adjust visible content by dragging mouse over the chart.',
        top: 50,
        left: 60,
    },
    {
        title: 'Details',
        description:
            'Point details. You can see more information about point by hovering over it.',
        top: 14,
        left: 30,
    },
    {
        title: 'Clock Noises',
        description:
            'You can save chart as image by clicking on the button. It will be downloaded as png file.',
        top: 70,
        left: 50,
    },
    {
        title: 'Save chart as image',
        description:
            'Clock noises visualize how rapidly the values ​​change over a given range',
        top: 90.5,
        left: 10,
    },
    {
        title: 'Save chart as csv',
        description:
            'You can save chart as csv file by clicking on the button. It will be downloaded as csv file.',
        top: 90.5,
        left: 90,
    },
]
