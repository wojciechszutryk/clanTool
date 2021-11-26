// @ts-ignore
import text from 'assets/R20-.txt'

const convertRinexDataIntoJSON = async (name: string) => {
    const r = await fetch(text)
    const rText = await r.text()
    const lines = rText.split(/\n/)
    const data: number[] = []
    const returnObj: any = {}
    lines.forEach((line) => {
        const split = line.split(/\s+/)

        const date = new Date(
            +split[2],
            +split[3] - 1,
            +split[4],
            +split[5],
            +split[6],
            +split[7]
        )

        const obj: any = {}
        obj.date = date.valueOf()
        obj.phase = +split[9]

        if (obj.date && obj.phase) data.push(obj)
    })
    returnObj['data'] = data
    returnObj['interval'] = Math.abs(
        parseInt(lines[0].split(/\s+/)[7]) -
            parseInt(lines[1].split(/\s+/)[7]) +
            (parseInt(lines[0].split(/\s+/)[6]) -
                parseInt(lines[1].split(/\s+/)[6])) *
                60 +
            (parseInt(lines[0].split(/\s+/)[5]) -
                parseInt(lines[1].split(/\s+/)[5])) *
                3660
    )
    returnObj['start'] =
        lines[0].split(/\s+/)[2] +
        ' ' +
        lines[0].split(/\s+/)[3] +
        ' ' +
        lines[0].split(/\s+/)[4] +
        ' ' +
        lines[0].split(/\s+/)[5] +
        ' ' +
        lines[0].split(/\s+/)[6] +
        ' ' +
        lines[0].split(/\s+/)[7]
    returnObj['end'] =
        lines[lines.length - 2].split(/\s+/)[2] +
        ' ' +
        lines[lines.length - 2].split(/\s+/)[3] +
        ' ' +
        lines[lines.length - 2].split(/\s+/)[4] +
        ' ' +
        lines[lines.length - 2].split(/\s+/)[5] +
        ' ' +
        lines[lines.length - 2].split(/\s+/)[6] +
        ' ' +
        lines[lines.length - 2].split(/\s+/)[7]

    const a = document.createElement('a')
    a.href = URL.createObjectURL(
        new Blob([JSON.stringify(returnObj, null, 2)], {
            type: 'text/plain',
        })
    )
    a.setAttribute('download', `${name}.json`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    console.log(returnObj)
    return returnObj
}

export default convertRinexDataIntoJSON
