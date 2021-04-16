export async function captureVideo(constraints?: MediaTrackConstraints) {
  const options = { video: constraints || true };
  const stream = await navigator.mediaDevices.getUserMedia(options);
  const video = document.createElement('video');
  video.srcObject = stream;
  video.play();
  return video;
}
