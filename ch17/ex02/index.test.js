import { jest } from '@jest/globals';
import { listIssues, createIssue, closeIssue } from "./index.js";

// https://netflix.github.io/pollyjs/#/quick-start
import { Polly } from "@pollyjs/core";
// http/https をフックする
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
// レスポンスをファイルに保存する
import FSPersister from "@pollyjs/persister-fs";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// describe('Jest mock', () => { 
//   beforeEach(() => {
//     global.fetch = jest.fn();
//     process.env.GITHUB_TOKEN = "test-token";
//   });
  
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
  
//   test("listIssues should print issue list", async () => {
//     fetch.mockResolvedValue({
//       ok: true,
//       status: 200,
//       text: async () =>
//         JSON.stringify([
//           { number: 1, title: "Issue one" },
//           { number: 2, title: "Issue two" },
//         ]),
//     });
//     // 実際の出力を止めるために console.log をモックする
//     const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  
//     await listIssues("owner", "repo");
  
//     expect(fetch).toHaveBeenCalledWith(
//       "https://api.github.com/repos/owner/repo/issues",
//       expect.objectContaining({ method: "GET" })
//     );
  
//     expect(spy).toHaveBeenCalledWith("#1: Issue one");
//     expect(spy).toHaveBeenCalledWith("#2: Issue two");
  
//     spy.mockRestore();
//   });
  
//   test("createIssue should send POST request", async () => {
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       status: 201,
//       text: async () => JSON.stringify({ number: 123 }),
//     });
//     // 実際の出力を止めるために console.log をモックする
//     const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  
//     await createIssue("owner", "repo", "title", "body");
  
//     expect(fetch).toHaveBeenCalledWith(
//       "https://api.github.com/repos/owner/repo/issues",
//       expect.objectContaining({
//         method: "POST",
//         body: JSON.stringify({ title: "title", body: "body" }),
//       })
//     );
  
//     expect(spy).toHaveBeenCalledWith("Created issue #123");
  
//     spy.mockRestore();
//   });
  
//   test("closeIssue should send PATCH request", async () => {
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       status: 200,
//       text: async () => JSON.stringify({ number: 123 }),
//     });
//     // 実際の出力を止めるために console.log をモックする
//     const spy = jest.spyOn(console, "log").mockImplementation(() => {});
//     await closeIssue("owner", "repo", 123);
    
//     expect(fetch).toHaveBeenCalledWith(
//       "https://api.github.com/repos/owner/repo/issues/123",
//       expect.objectContaining({
//         method: "PATCH",
//         body: JSON.stringify({ state: "closed" }),
//       })
//     );
    
//     expect(spy).toHaveBeenCalledWith("Closed issue #123");
//     spy.mockRestore();
//   });
// })

describe("Pollyjs", () => {
  let polly;

  beforeEach(() => {
    process.env.GITHUB_TOKEN = "test-token";
    polly = new Polly("github-issues", {
      adapters: ["node-http"],
      persister: "fs",
      recordIfMissing: true,
    });
  });
  afterEach(async () => {
    await polly.stop();
  });

  test("listIssues should print issue list", async () => {
    // 実際の出力を止めるために console.log をモックする
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  
    await listIssues("octocat", "Hello-World");
  
    expect(spy).toHaveBeenCalled();
  
    spy.mockRestore();
  });
  
  // test("createIssue should send POST request", async () => {
  //   // 実際の出力を止めるために console.log をモックする
  //   const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  
  //   await createIssue("LimeSML", "js-exercises", "title", "body");
  
  //   expect(spy).toHaveBeenCalled(expect.stringMatching(/^Created issue #\d+$/));
  
  //   spy.mockRestore();
  // });
  
  // test("closeIssue should send PATCH request", async () => {
  //   // 実際の出力を止めるために console.log をモックする
  //   const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  //   await closeIssue("LimeSML", "js-exercises", 123);
    
  //   expect(spy).toHaveBeenCalledWith("Closed issue #123");
  //   spy.mockRestore();
  // });
});
