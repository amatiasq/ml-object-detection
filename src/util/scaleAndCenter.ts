export function scaleAndCenter(source: Rectangle, target: Rectangle) {
  const wRatio = target.width / source.width;
  const hRatio = target.height / source.height;
  const ratio = Math.min(wRatio, hRatio);
  const width = source.width * ratio;
  const height = source.height * ratio;

  return {
    x: (target.width - width) / 2,
    y: (target.height - height) / 2,
    width,
    height,
  };
}

export interface Rectangle {
  width: number;
  height: number;
}
