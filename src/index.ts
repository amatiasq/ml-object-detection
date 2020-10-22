import { fillPage, getSize, context, renderText } from './canvas';
import { captureVideo } from './util/captureVideo';
import { scaleAndCenter } from './util/scaleAndCenter';

declare global {
  const ml5: any;
}

fillPage();

(async () => {
  printLoading();
  const video = await captureVideo();
  const detector = await ml5.objectDetector('cocossd');
  let detections: any[] = [];

  detect();
  frame();

  function frame() {
    const screen = getSize();
    const rect = scaleAndCenter(
      {
        width: video.videoWidth,
        height: video.videoHeight,
      },
      screen,
    );

    video.width = rect.width;
    video.height = rect.height;

    context.clearRect(0, 0, screen.width, screen.height);
    context.drawImage(video, rect.x, rect.y, rect.width, rect.height);

    detections.forEach((entity) => {
      const x = entity.x + rect.x;
      const y = entity.y + rect.y;
      const conf = Math.round(entity.confidence * 100);

      context.textAlign = 'left';
      context.strokeStyle = 'red';
      context.lineWidth = 3;

      context.strokeRect(x, y, entity.width, entity.height);
      renderText(entity.label, x + 10, y + 24, '24px Arial');
      renderText(`${conf}%`, x + 10, y + 50, '16px Arial');
    });

    requestAnimationFrame(frame);
  }

  async function detect() {
    detections = await detector.detect(video);
    detect();
  }
})();

function printLoading() {
  const screen = getSize();
  context.textAlign = 'center';
  renderText('Loading...', screen.width / 2, screen.height / 2, '24px Arial');
}
