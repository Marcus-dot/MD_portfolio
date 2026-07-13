/* Dev-only QA helper: screenshot the running site at a given scroll target.
   Usage: node scripts/screenshot.mjs <url> <out.png> [scrollToSelector] [width] [height]
   Requires Google Chrome installed. */
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [url, out, selector, width = "1440", height = "1000", delayMs = "2500"] =
  process.argv.slice(2);
if (!url || !out) {
  console.error("usage: screenshot.mjs <url> <out.png> [selector] [w] [h]");
  process.exit(1);
}

const port = 9222 + Math.floor(Math.random() * 500);
const chrome = execFile(CHROME, [
  "--headless",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--window-size=${width},${height}`,
  "--hide-scrollbars",
  "about:blank",
]);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await wait(200);
  }
  throw new Error("chrome did not start");
}

const ws = new WebSocket(await getTarget());
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Page.enable");
// Pin the viewport to the exact requested size — --window-size is outer
// window bounds and can shave height off the viewport.
await send("Emulation.setDeviceMetricsOverride", {
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url });
await wait(Number(delayMs));
if (selector) {
  await send("Runtime.evaluate", {
    expression: `document.documentElement.style.scrollBehavior="auto";document.querySelector(${JSON.stringify(selector)})?.scrollIntoView()`,
  });
  await wait(600);
}
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
chrome.kill();
process.exit(0);
