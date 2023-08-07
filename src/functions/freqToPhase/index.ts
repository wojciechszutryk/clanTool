/**
 * This function converts a frequency data to a phase data
 */
export default function freqToPhase({ data, tau }: { data: number[]; tau: number }) {
  let newData = [0];
  for (let i = 1; i < data.length; i++) {
    newData.push(data[i - 1] * tau + newData[i - 1]);
  }
  return newData;
}
