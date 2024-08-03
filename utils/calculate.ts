export function readingTime(document: string) : number {
  const wpm = 225;
  const words = document.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}