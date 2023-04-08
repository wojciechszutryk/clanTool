import { TauTypes } from 'models/inputData.model'

/**
 * This function is used to generate an array of tau values
 */
export function generateLogTauData(
    tauType: TauTypes | undefined,
    a: number,
    b: number,
    n: number
) {
    let arr: number[] = []

    switch (tauType) {
        case TauTypes.logarithmLike: {
            return [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90,
                100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000,
                4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000,
                50000, 60000, 70000, 80000, 90000, 100000,
            ]
        }
        case TauTypes.powerOfTen: {
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
