export default function convertSeconds(input: string) {
  // Extract the number of seconds from the input string
  const totalSeconds = parseInt(input, 10);

  // Calculate the number of minutes and the remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the output as "Xm:YYs"
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
