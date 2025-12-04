import { sendRequest } from "./request.js";

const send1 = document.querySelector("#send1");
send1.addEventListener("click", async () => {
  const req1 = document.querySelector("#req1");
  const res1 = document.querySelector("#res1");
  try {
    const response = await sendRequest(req1.value);
    res1.textContent = response;
  } catch (err) {
    res1.textContent = err.message;
  }
});

const send2 = document.querySelector("#send2");
send2.addEventListener("click", async () => {
  const req2 = document.querySelector("#req2");     
  const res2 = document.querySelector("#res2");
  try {
    const response = await sendRequest(req2.value);
    res2.textContent = response;
  } catch (err) {
    res2.textContent = err.message;
  }
});