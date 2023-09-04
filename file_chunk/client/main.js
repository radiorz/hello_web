import { cutFile } from "./cutFile";
const inputFile = document.querySelector('input[type="file"]');
inputFile.onchange = async (e) => {
  const file = e.target.files[0];
  console.time("cutTime");
  const chunks = await cutFile(file);
  console.timeEnd("cutTime");
  console.log(`chunks`, chunks);
};

// 优化点
// 可以一边分片一边上传
