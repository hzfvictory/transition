import express, { static as serve } from "express";
import multiparty from "connect-multiparty";

import * as UploadService from "./services/upload";

import { name, version } from "./utils/pkg";
import { resolveApp } from "./utils/paths";

const app = express();

const multipartyMiddleWare = multiparty();

app.get("/", function(req, res, next) {
  const result = {
    ret: 200,
    data: {
      title: name,
      version,
      date: new Date().toISOString()
    },
    msg: "success"
  };

  console.log("result", result);

  res.json(result);
});

app.use("/api/upload/alibaba", multipartyMiddleWare, UploadService.alibaba);

app.use("/api/upload/jingdong", multipartyMiddleWare, UploadService.jingdong);

app.use(serve(resolveApp("public")));

export default app;
