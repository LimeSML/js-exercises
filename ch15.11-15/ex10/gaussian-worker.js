self.onmessage = (event) => {
  const { width, height, data } = event.data;
  const input = new Uint8ClampedArray(data);
  const output = new Uint8ClampedArray(input.length);

  const kernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1]
  ];
  const kernelSum = 256;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0;
      let g = 0;
      let b = 0;

      for (let ky = -2; ky <= 2; ky++) {
        for (let kx = -2; kx <= 2; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx));
          const py = Math.min(height - 1, Math.max(0, y + ky));

          // ImageData.dataは1次元配列で、RGBAの順で格納されている
          const pixelIndex = (py * width + px) * 4;
          const weight = kernel[ky + 2][kx + 2];

          r += input[pixelIndex] * weight;
          g += input[pixelIndex + 1] * weight;
          b += input[pixelIndex + 2] * weight;
        }
      }

      // ImageData.dataは1次元配列で、RGBAの順で格納されている
      const outIndex = (y * width + x) * 4;
      output[outIndex]     = r / kernelSum;
      output[outIndex + 1] = g / kernelSum;
      output[outIndex + 2] = b / kernelSum;
      output[outIndex + 3] = input[outIndex + 3]; // α値はそのまま
    }
  }

  // ArrayBuffer を返送
  self.postMessage(output.buffer, [output.buffer]);
};
