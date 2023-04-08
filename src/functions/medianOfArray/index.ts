/**
 * This function returns the median of an array of numbers.
 */
export function medianOfArr(arr: number[]) {
    const L = arr.length,
        halfL = L / 2
    if (L % 2 === 1) return quickselect(arr, halfL)
    else return 0.5 * (quickselect(arr, halfL - 1) + quickselect(arr, halfL))
}

function quickselect(arr: number[], k: number): number {
    if (arr.length === 1) return arr[0]
    else {
        const pivot = arr[0]
        const lows = arr.filter((e) => e < pivot)
        const highs = arr.filter((e) => e > pivot)
        const pivots = arr.filter((e) => e == pivot)
        if (k < lows.length) return quickselect(lows, k)
        else if (k < lows.length + pivots.length) return pivot
        else return quickselect(highs, k - lows.length - pivots.length)
    }
}
