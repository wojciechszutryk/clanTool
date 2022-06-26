import { medianOfArr } from 'functions/medianOfArray/medianOfArray'
import store from 'state/store'

const data = [
    18.57, 18.33, 18.31, 18.64, 18.6, -3462.07, 3499.01, 18.83, 18.38, 18.75,
    18.93, 18.61, 18.13, 18.5, 18.3, 18.11, 18.54, 18.48, 18.67, 18.07, 18.46,
    18.09, 17.8, 17.94, 18.81, 18.41, 18.51, 18.88, 18.17, 18.51, 18.74, 19.23,
    18.41, 18.61, 17.98, 2650.84, -2613.74, 18.8, 18.62, 18.1, 18.35, 18.24,
    18.71, 18.56, 18.6, 18.66, 18.91, 18.12, 18.88, 18.3, 18.69, 18.57, 18.29,
    18.83, 18.31, 18.97, 18.71, 18.34, 18.72, 18.5, 18.35, 18.43, 18.54, 18.74,
    18.89, 18.32, 18.73, 18.35, 18.87, 18.58, 18.19, 18.32, 18.41, 18.17, 18.74,
    18.64, 18.68, 17.96, 18.73, 18.91, 18.37, 18.24, 18.75, 18.42, 18.38, 18.87,
    18.62, 18.8, -8332.04, 8369.56, 18.26, 18.66, 18.84, 19.21, 18.62, 18.35,
    18.75,
]

export const madFilter = (data: number[]) => {
    const medianOfNewData = medianOfArr(data)

    const madArrayValues = data.map((e) =>
        Math.abs((e - medianOfNewData) / 0.6745)
    )

    const madValue = medianOfArr(madArrayValues)
    const MADMultiply = store.getState().app.MADMultiply
        ? store.getState().app.MADMultiply
        : 3
    const multipliedMadValue = madValue * MADMultiply

    return data.filter(
        (e) =>
            e < medianOfNewData + multipliedMadValue &&
            e > medianOfNewData - multipliedMadValue
    )
}

console.log(madFilter(data))
