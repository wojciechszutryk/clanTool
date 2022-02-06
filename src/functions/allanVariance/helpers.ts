import { TauType } from 'state/constans/types'
import store from 'state/store'

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
    // console.log('start'+a)
    // console.log('end' + b)
    // let arr = new Set<number>()
    //
    // let start = Math.log10(a)
    // let end = Math.log10(b)
    // let div = n - 1
    // let delta = end - start
    //
    // for (let i = 0; i < n; i++) {
    //     arr.add(Math.round(Math.pow(10, start + delta * (i / div))))
    // }
    // console.log(arr)
    // return Array.from(arr)
    const tauType = store.getState().app.tauType
    let arr: number[] = []

    switch (tauType) {
        case TauType.logarithmLike: {
            return [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90,
                100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000,
                4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000,
                50000, 60000, 70000, 80000, 90000, 100000,
            ]
        }
        case TauType.powerOfTen: {
            for (let i = a; i < b; i = i * 10) {
                arr.push(i)
            }
            break
        }
        default: {
            for (let i = a; i < b; i = i * 2) {
                arr.push(i)
            }
            break
        }
    }
    return arr
}

// export function arrayOfEveryNthElements(arr: number[], S: number, N: number) {
//     let new_arr = [arr[S]]
//     for (let i = S + 1; i < arr.length; i++) {
//         if ((i - S) % N === 0) new_arr.push(arr[i])
//     }
//     return new_arr
// }
