onmessage = function(message) {
  const {tile} = message.data;
  const {width, height} = tile;

  const imageData = new ImageData(width, height);
  const iterations = new Uint32Array(imageData.data.buffer);

  let index = 0;
  let max = 1;
  let min = 0;

  // 参考：https://lcamtuf.substack.com/p/sierpinski-triangle-in-my-bitwise
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const mm = (x & y) === 0 ? 1 : 0;
      iterations[index++] = mm;
    }
  }

  this.postMessage({tile, imageData, min, max}, [imageData.data.buffer]);
}