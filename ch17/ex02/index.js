import process from "process";

const BASE_URL = "https://api.github.com";

function getToken() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }
  return token;
}


async function request(method, path, body, verbose = false) {
  const url = `${BASE_URL}${path}`;
  
  const token = getToken();
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

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


export async function listIssues(owner, repoName, verbose = false) {
  if (typeof owner !== "string" || typeof repoName !== "string") {
    throw new Error("Owner and repository name must be strings");
  }

  try {
    const issues = await request(
      "GET",
      `/repos/${owner}/${repoName}/issues`,
      undefined,
      verbose
    );
  
    issues.forEach((issue) => {
      console.log(`#${issue.number}: ${issue.title}`);
    });
  } catch (error) {
    console.error("Error listing issues:", error.message);
  }
}

export async function createIssue(owner, repoName, title, body, verbose = false) {
  if (typeof owner !== "string" || typeof repoName !== "string") {
    throw new Error("Owner and repository name must be strings");
  }
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title must be a non-empty string");
  }
  if (typeof body !== "string") {
    throw new Error("Body must be a string");
  }
  
  try {
    const issue = await request(
      "POST",
      `/repos/${owner}/${repoName}/issues`,
      { title, body },
      verbose
    );
  
    console.log(`Created issue #${issue.number}`);
  } catch (error) {
    console.error("Error creating issue:", error.message);
  }
}

export async function closeIssue(owner, repoName, issueNumber, verbose = false) {
  if (typeof owner !== "string" || typeof repoName !== "string") {
    throw new Error("Owner and repository name must be strings");
  }
  if (typeof issueNumber !== "number" || issueNumber <= 0) {
    throw new Error("Issue number must be a positive integer");
  }

  try {
    await request(
      "PATCH",
      `/repos/${owner}/${repoName}/issues/${issueNumber}`,
      { state: "closed" },
      verbose
    );

    console.log(`Closed issue #${issueNumber}`);
  } catch (error) {
    console.error("Error closing issue:", error.message);
  }
}