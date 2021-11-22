// @ts-ignore
import text from 'assets/StationSatelliteData.txt'

const getStationSatelliteDataFromFile = async (name: string) => {
    const r = await fetch(text)
    const rText = await r.text()
    const lines = rText.split(/\n/)
    const data: number[] = []
    lines.forEach((line) => {
        const split = line.split(/\s+/)
        if (split[1] === name) {
            data.push(+split[9])
        }
    })
    return data
}

export default getStationSatelliteDataFromFile
