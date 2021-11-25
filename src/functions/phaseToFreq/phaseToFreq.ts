export default function phaseToFreq({
    data,
    tau,
}: {
    data: number[]
    tau: number
}) {
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
        newData.push((data[i + 1] - data[i]) / tau)
    }
    return newData
}
