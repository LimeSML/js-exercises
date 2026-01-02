const BASE_URL = "https://api.github.com";
const args = process.argv.slice(2);

const showHelp = args.includes("-h") || args.includes("--help");
if (showHelp) {
  printHelp();
  process.exit(0);
}

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GITHUB_TOKEN is not set");
  process.exit(1);
}

// verbose オプションを除外した引数一覧
const filteredArgs = args.filter(
  (arg) => arg !== "-v" && arg !== "--verbose"
);

// コマンドと引数を分解
const command = filteredArgs[0];
const repo = filteredArgs[1];
const rest = filteredArgs.slice(2);

if (!command || !repo) {
  printHelp();
  process.exit(1);
}

// https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28"
};

async function request(method, path, body, verbose = false) {
  const url = `${BASE_URL}${path}`;

  if (verbose) {
    console.log(`HTTP ${method} ${url}`);
    if (body) {
      console.log("Request body:", body);
    }
  }

  // わざわざ http モジュールは使わない
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (verbose) {
    console.log("Status:", res.status);
    console.log("Response:", data);
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return data;
}

const [owner, repoName] = repo.split("/");
const verbose = args.includes("-v") || args.includes("--verbose");

switch (command) {
  case "list": {
    const issues = await request(
      "GET",
      `/repos/${owner}/${repoName}/issues`,
      undefined,
      verbose
    );

    issues.forEach((issue) => {
      console.log(`#${issue.number}: ${issue.title}`);
    });
    break;
  }

  case "create": {
    const [title, body] = rest;
    if (!title) {
      console.error("title is required");
      process.exit(1);
    }

    const issue = await request(
      "POST",
      `/repos/${owner}/${repoName}/issues`,
      { title, body },
      verbose
    );

    console.log(`Created issue #${issue.number}`);
    break;
  }

  case "close": {
    const [issueNumber] = rest;
    if (!issueNumber) {
      console.error("issue number is required");
      process.exit(1);
    }

    await request(
      "PATCH",
      `/repos/${owner}/${repoName}/issues/${issueNumber}`,
      { state: "closed" },
      verbose
    );

    console.log(`Closed issue #${issueNumber}`);
    break;
  }

  default:
    printHelp();
    process.exit(1);
}

function printHelp() {
  console.log(`
GitHub Issue CLI

Usage:
  list <owner/repo>
  create <owner/repo> <title> [body]
  close <owner/repo> <issueNumber>

Options:
  -h, --help       Show help
  -v, --verbose    Show HTTP logs

Excamples:
  node index.js list raimuhoshi/js-exercises
  node index.js create raimuhoshi/js-exercises "New issue title" "Issue body"
  node index.js close raimuhoshi/js-exercises 42
`);
}
