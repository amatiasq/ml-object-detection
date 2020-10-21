import { context, fillPage, getSize, renderText } from './canvas';
import { loadImage } from './util/loadImage';
import { scaleAndCenter } from './util/scaleAndCenter';

(async () => {
  fillPage();
  printLoading();

  const image = await loadImage('https://repos.amatiasq.com/genara/img/3.png');

  frame();

  function frame() {
    const screen = getSize();
    const rect = scaleAndCenter(image, screen);

    context.clearRect(0, 0, screen.width, screen.height);
    context.drawImage(image, rect.x, rect.y, rect.width, rect.height);

    renderText(
      'Hello world',
      screen.width / 2,
      screen.height / 2,
      '40px arial',
      'white',
      'black',
    );

    requestAnimationFrame(frame);
  }
})();

function printLoading() {
  const screen = getSize();
  context.textAlign = 'center';
  renderText('Loading...', screen.width / 2, screen.height / 2, '24px Arial');
}
