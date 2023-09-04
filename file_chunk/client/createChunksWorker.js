import { createChunk } from "./createChunk.js";

onmessage = async (e) => {
  console.log(`e.data`, e.data);
  const { file, CHUNK_SIZE, startIndex, endIndex } = e.data;
  const promiseResult = [];
  for (let i = startIndex; i < endIndex; i++) {
    promiseResult.push(createChunk(file, i, CHUNK_SIZE)); // 一个分片的信息
  }
  const chunks = await Promise.all(promiseResult);
  postMessage(chunks);
};
