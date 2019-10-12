import { createReadStream } from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

// 京东
export async function jingdong(req, res, next) {
  const { originalFilename, path } = req.files.file;

  const file = createReadStream(path);

  const formData = new FormData();
  formData.append("file", file);

  const params = {
    body: formData,
    method: "POST",
    mode: "no-cors",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      Referer: "https://www.jd.com",
      Origin: "https://www.jd.com",
      "Upgrade-insecure-requests": "1"
    }
  };

  try {
    const url = await fetch("https://search.jd.com/image?op=upload", params)
      .then(response => response.text())
      .then(response => /callback\("(jfs.*)"\);/.exec(response) || [])
      .then(([, url]) => {
        if (url) return `https://img10.360buyimg.com/img/${url}`;
        throw new Error("upload error");
      });

    const result = {
      ret: 200,
      data: {
        originalFilename,
        url,
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
