import { spawn } from "child_process";
import fs from "fs/promises";

export const downgradeTo360p = async (
  inputPath: string,
  outputPath: string,
  onEnd: () => void,
  onError: (err: Error) => void
) => {
  console.log("=== FFmpeg downgradeTo360p Debug ===");
  console.log("Input video path:", inputPath);
  console.log("Output video path:", outputPath);
  console.log("============================");

  const ffmpeg = spawn("ffmpeg", [
    "-i",
    inputPath,
    "-vf",
    "scale=-1:360",
    "-c:a",
    "copy",
    outputPath,
  ]);

  ffmpeg.stderr.on("data", (data) => {
    console.log("FFmpeg stderr:", data.toString());
  });

  ffmpeg.on("close", (code) => {
    if (code === 0) {
      console.log("Video downgraded to 360p:", outputPath);
      onEnd();
    } else {
      onError(new Error(`FFmpeg exited with code: ${code}`));
    }
  });

  ffmpeg.on("error", (err) => {
    onError(err);
  });
};
export default  {downgradeTo360p} 