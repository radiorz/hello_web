const CHUNK_SIZE = 1024 * 1024 * 5; // 5 mb
const THREAD_COUNT = navigator.hardwareConcurrency || 4;
export async function cutFile(file) {
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 分片数量
  const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT); // 每个线程处理的数量
  let finishCount = 0;
  const result = new Promise((resolve, reject) => {
    const result = [];
    for (let i = 0; i < chunkCount; i++) {
      const worker = new WebWorker("./createChunksWorker.js", {
        type: "module",
      });
      // 计算每个线程的开始索引和结束索引
      const startIndex = i * workerChunkCount;
      const endIndex = startIndex + workerChunkCount;
      if (endIndex > chunkCount) {
        endIndex = chunkCount;
      }
      worker.postMessage({ file, CHUNK_SIZE, startIndex, endIndex });
      worker.onmessage = (e) => {
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = e.data[i - startIndex];
        }
        worker.terminate();
        finishCount++;
        if (finishCount >= THREAD_COUNT) {
          resolve(result);
        }
      };
    }
  });
  return result;
}
