#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { compose } from "./compose.mjs";
import { closeBrowser } from "./render.mjs";

function usage() {
  console.error(`Uso:
  node pipeline/cli.mjs --spec <caminho.json>

JSON shape:
  {
    "manualPath": "/abs/path/manual-da-marca-xxx.html",
    "clienteDir": "/abs/path/Clientes/xxx",        // opcional
    "jobs": [
      {
        "template": "post-estatico-dado",
        "size": "square",                          // square|portrait|story
        "outputPath": "/abs/path/imagens/slide-01.png",
        "backgroundImage": "/abs/.../fundo.png",   // opcional
        "props": { "title": "...", "subtitle": "...", "highlight": "R$ 367" }
      }
    ]
  }
`);
  process.exit(2);
}

async function main() {
  const args = process.argv.slice(2);
  const specIdx = args.indexOf("--spec");
  if (specIdx < 0 || !args[specIdx + 1]) usage();

  const specPath = args[specIdx + 1];
  const spec = JSON.parse(await readFile(specPath, "utf8"));
  const { manualPath, clienteDir, jobs } = spec;
  if (!manualPath || !Array.isArray(jobs)) usage();

  for (const job of jobs) {
    const out = await compose({
      manualPath,
      clienteDir,
      template: job.template,
      size: job.size || "square",
      props: job.props || {},
      backgroundImage: job.backgroundImage,
      outputPath: job.outputPath,
    });
    console.log(`OK ${job.template} -> ${out}`);
  }
}

main()
  .catch((e) => {
    console.error("ERRO:", e.stack || e.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeBrowser();
  });
