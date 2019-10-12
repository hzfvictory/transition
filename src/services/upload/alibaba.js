import { createReadStream } from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

// 阿里巴巴
export async function alibaba(req, res, next) {
  const { originalFilename, path: filePath } = req.files.file;

  const file = createReadStream(filePath);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("scene", "aeMessageCenterV2ImageRule");
  formData.append("name", originalFilename);

  const params = {
    body: formData,
    method: "POST",
    mode: "cors"
  };

  try {
    const data = await fetch(
      "https://kfupload.alibaba.com/mupload",
      params
    ).then(response => response.json());

    if (data.code === "1") {
      throw new Error("upload error");
    }

    const { url, width, height, hash, size, fs_url } = data;

    const result = {
      ret: 200,
      data: {
        originalFilename,
        filename: fs_url,
        url,
        size,
        width,
        height,
        hash,
        date: new Date().toISOString()
      },
      msg: "success"
    };

    console.log("result", result);

    res.json(result);
  } catch (error) {
    console.error("Error", error);

    res.json({
      ret: 400,
      data: {
        date: new Date().toISOString()
      },
      msg: "error"
    });
  }
}
