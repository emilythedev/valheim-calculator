export const readStdin = (callback) => {
  let data = '';

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      data += chunk.toString();
    }
  });

  process.stdin.on('end', () => {
    callback(data);
  });
};
