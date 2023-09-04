import SpackMD5 from "./spackmd5.js";
// md5在主线程会造成卡顿 需要用 webWorker

export async function createChunk(file, index, chunkSize) {
  const start = index * chunkSize;
  const end = start + chunkSize;

  const spark = new SpackMD5.ArrayBuffer();
  const fileReader = new FileReader();
  const result = new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      spack.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
      });
    };
  });
  fileReader.readAssArrayBuffer(file.slice(start, end));
  return await result;
}
