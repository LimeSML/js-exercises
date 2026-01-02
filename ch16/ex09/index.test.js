import request from "supertest";
import fs from "fs";
import path from "path";
import os from "os";
import { serve } from "./index.js";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

let tmpDir;

beforeAll(() => {
  // テスト用ディレクトリ作成
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "static"));
  fs.writeFileSync(
    path.join(tmpDir, "index.html"),
    "<h1>Hello Test</h1>"
  );

  // サーバ起動
  serve(tmpDir, PORT);
});

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("/test/mirror", () => {
  test("GET request is mirrored", async () => {
    const res = await request(BASE_URL)
      .get("/test/mirror")
      .set("X-Test", "mirror");

    expect(res.status).toBe(200);
    expect(res.text).toContain("GET /test/mirror HTTP/");
    expect(res.text).toContain("x-test: mirror");
  });

  test("POST body is mirrored", async () => {
    const res = await request(BASE_URL)
      .post("/test/mirror")
      .send("hello body");

    expect(res.status).toBe(200);
    expect(res.text).toContain("hello body");
  });
});

describe("static file serving", () => {
  test("serves existing file", async () => {
    const res = await request(BASE_URL).get("/index.html");

    expect(res.status).toBe(200);
    expect(res.text).toBe("<h1>Hello Test</h1>");
  });

  test("returns 404 for missing file", async () => {
    const res = await request(BASE_URL).get("/no-such-file.txt");

    expect(res.status).toBe(404);
  });
});
