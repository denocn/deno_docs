/** @jsx h */
import { h } from "https://esm.sh/preact@10";
import render from "https://esm.sh/preact-render-to-string@5";

import type { Toc } from "https://cdn.jsdelivr.net/gh/justjavac/deno_docx/components/Sidebar.tsx";
import App from "https://cdn.jsdelivr.net/gh/justjavac/deno_docx/App.tsx";

// clean `/dist` dir
await Deno.remove("dist", { recursive: true }).catch(() => {});

const toc: Toc = JSON.parse(await Deno.readTextFile("toc.json"));

for (const [path, { name, children }] of Object.entries(toc)) {
  createHtml(path);
  if (children == null) continue;
  for (const [subPath, subName] of Object.entries(children)) {
    createHtml(`${path}/${subPath}`);
  }
}

await copyImages();
await downloadCss();
await downloadFavicon();

async function createHtml(path: string) {
  console.log("create file %s", path);
  await Deno.mkdir(`dist/${path}`, { recursive: true }).catch(() => {});
  const content = await Deno.readTextFile(`${path}.md`);
  const savePath = `dist/${path}/index.html`;
  const html = `<!DOCTYPE html>${render(<App toc={toc} content={content} />)}`;
  await Deno.writeTextFile(savePath, html);
}

async function copyImages() {
  console.log("copy images");
  await Deno.mkdir("dist/images", { recursive: true });

  for await (const dirEntry of Deno.readDir("images")) {
    await Deno.copyFile(
      `images/${dirEntry.name}`,
      `dist/images/${dirEntry.name}`,
    );
  }
}

async function downloadCss() {
  console.log("download css");
  await Deno.mkdir(`dist/public`, { recursive: true }).catch(() => {});
  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/justjavac/deno_docx/public/style.css",
  );
  const buffer = await response.arrayBuffer();
  await Deno.writeFile("dist/public/style.css", new Uint8Array(buffer));
}

async function downloadFavicon() {
  console.log("download favicon");
  await Deno.mkdir(`dist/public`, { recursive: true }).catch(() => {});
  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/justjavac/deno_docx/public/favicon.ico",
  );
  const buffer = await response.arrayBuffer();
  await Deno.writeFile("dist/favicon.ico", new Uint8Array(buffer));
}
