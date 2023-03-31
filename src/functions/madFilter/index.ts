import { medianOfArr } from 'functions/medianOfArray'
import store from 'state/store'

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
