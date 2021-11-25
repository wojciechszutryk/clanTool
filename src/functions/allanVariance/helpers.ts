export function getAveragedSignal(arr: number[], n: number, stride = 1) {
    let result = []
    let cur_avg = 0
    for (let i = 0; i <= Math.floor((arr.length - n) / stride); i++) {
        cur_avg = 0
        for (let j = 0; j < n; j++) {
            cur_avg += arr[i * stride + j]
        }
        result.push(cur_avg / n)
    }
    return result
}

export function generateLogTauData(a: number, b: number, n: number) {
    let arr = new Set<number>()

    let start = Math.log10(a)
    let end = Math.log10(b)
    let div = n - 1
    let delta = end - start

    for (let i = 0; i < n; i++) {
        arr.add(Math.round(Math.pow(10, start + delta * (i / div))))
    }
    return Array.from(arr)
}

// export function arrayOfEveryNthElements(arr: number[], S: number, N: number) {
//     let new_arr = [arr[S]]
//     for (let i = S + 1; i < arr.length; i++) {
//         if ((i - S) % N === 0) new_arr.push(arr[i])
//     }
//     return new_arr
// }
