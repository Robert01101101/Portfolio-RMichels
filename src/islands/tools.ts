export function mapVal(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export function calcDocHeight() {
  const docHeightBody = document.body;
  const html = document.documentElement;
  return Math.max(
    docHeightBody.scrollHeight,
    docHeightBody.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

export const xlBreakPoint = 1200;
