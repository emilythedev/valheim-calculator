export const readStdin = async () => {
  return new Promise((resolve, reject) => {
    let data = '';

    const onRead = () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        data += chunk.toString();
      }
    };

    const onEnd = () => {
      off();
      resolve(data);
    };

    const onError = (err) => {
      off();
      reject(err);
    };

    const off = () => {
      process.stdin.off('readable', onRead);
      process.stdin.off('end', onEnd);
      process.stdin.off('error', onError);
    };

    process.stdin.on('readable', onRead);
    process.stdin.on('end', onEnd);
    process.stdin.on('error', onError);
  });
};
