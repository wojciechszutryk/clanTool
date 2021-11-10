// @ts-ignore
import text from 'assets/SateliteStationsBase.txt';

const satelliteStationsBaseToNames = async () => {
    const r = await fetch(text);
    const rText = await r.text();
    const lines = rText.split(/\n/)
    const names: string[] = lines.map(line => (
        line.split(/\s+/)[0]
    ))
    return names;
}

export default satelliteStationsBaseToNames