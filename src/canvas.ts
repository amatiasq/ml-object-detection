const canvas = document.querySelector('canvas')!;
export const context = canvas.getContext('2d')!;

export function getSize() {
  const { width, height } = canvas;
  return { width, height };
}

export function fillPage() {
  canvasFillScreen();
  window.addEventListener('resize', canvasFillScreen);

  function canvasFillScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

export function renderText(
  text: string,
  x: number,
  y: number,
  font = '16px Arial',
  hex = 'white',
  outline = 'black',
) {
  context.font = font;
  context.lineWidth = 5;
  context.miterLimit = 2;

  context.strokeStyle = outline;
  context.strokeText(text, x, y);

  context.fillStyle = hex;
  context.fillText(text, x, y);
}
