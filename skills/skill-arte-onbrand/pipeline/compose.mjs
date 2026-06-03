import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, isAbsolute } from "node:path";
import { loadBrand } from "./brand-loader.mjs";
import { renderPng } from "./render.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = resolve(__dirname, "..", "templates");

export const SIZES = {
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
  landscape: { width: 1920, height: 1080 },
};

export async function compose({
  manualPath,
  clienteDir,
  template,
  props = {},
  outputPath,
  size = "square",
  backgroundImage,
}) {
  const brand = await loadBrand(manualPath, { clienteDir });
  const templatePath = join(TEMPLATES_DIR, `${template}.html`);
  const rawHtml = await readFile(templatePath, "utf8");

  const derivedHtml = deriveHtmlFields(props);

  const context = {
    googleFontsLink: brand.googleFontsLink,
    fontDisplay: brand.fonts.display,
    fontBody: brand.fonts.body,
    fontData: brand.fonts.data || brand.fonts.display,
    // Triplos RGB / hex p/ camadas decorativas dirigidas por token (default = verde legado).
    accentRgb: hexToRgb(brand.palette.accent),
    accentHex: hexClean(brand.palette.accent),
    bgDeepRgb: hexToRgb(brand.palette.bgDeep),
    logoPath: await toDataUrl(brand.logoPath),
    logoSymbolPath: await toDataUrl(brand.logoSymbolPath),
    backgroundImage: backgroundImage ? await toDataUrl(resolveAbs(backgroundImage, clienteDir)) : "",
    ...brand.palette,
    ...props,
    ...derivedHtml,
  };

  const html = interpolate(rawHtml, context);
  // Patch sessão #10 (deck Xiru): aceita size como string nomeada OU objeto {width, height}
  // para suporte a formatos custom (ex: 1920x1080 deck 16:9) sem quebrar API anterior.
  let dims;
  if (typeof size === "string") {
    dims = SIZES[size] || SIZES.square;
  } else if (size && typeof size === "object" && Number.isFinite(size.width) && Number.isFinite(size.height)) {
    dims = { width: size.width, height: size.height };
  } else {
    dims = SIZES.square;
  }

  return renderPng(html, outputPath, dims);
}

function resolveAbs(p, baseDir) {
  if (isAbsolute(p)) return p;
  return resolve(baseDir || process.cwd(), p);
}

async function toDataUrl(path) {
  if (!path || !existsSync(path)) return "";
  const mime =
    { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" }[
      extname(path).toLowerCase()
    ] || "application/octet-stream";
  const buf = await readFile(path);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const RAW_FIELDS = new Set([
  "googleFontsLink",
  "logoPath",
  "logoSymbolPath",
  "backgroundImage",
  "fontDisplay",
  "fontBody",
  "fontData",
  "accentRgb",
  "accentHex",
  "bgDeepRgb",
  "bgDeep",
  "bgDark",
  "accent",
  "accentLight",
  "light",
  "cream",
  "surface",
  "text",
  "muted",
  "amber",
  "red",
  // Campos HTML compostos pré-montados (deck 16:9 — sessão #10):
  "strikethroughHtml",
  "pillsHtml",
  "comparisonHtml",
  "actionsHtml",
  "contactsHtml",
  "tableHeadHtml",
  "tableBodyHtml",
  "mapSvg",
  "rightSideHtml",
  "regionListHtml",
  "provisorioDisplay",
  "headerRight",
  "pageInfo",
  "footerRight",
  "pillsCount",
  // Campo HTML inline para headline com cor customizada (vB card 1 verm #C0483A):
  "headlineHtml",
]);

function interpolate(template, context) {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    const v = context[key];
    if (v == null) return "";
    const s = String(v);
    if (RAW_FIELDS.has(key) || key.endsWith("Html")) return s;
    return applyInline(s);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function applyInline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function hexClean(hex) {
  return String(hex).replace(/[^0-9a-fA-F]/g, "").slice(0, 6).padEnd(6, "0");
}

function hexToRgb(hex) {
  const h = hexClean(hex);
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return "0,0,0";
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

function deriveHtmlFields(props) {
  const out = {};
  if (!props.bodyHtml && Array.isArray(props.paragraphs)) {
    out.bodyHtml = props.paragraphs.map((p) => `<p>${applyInline(p)}</p>`).join("");
  }
  if (!props.bodyHtml && typeof props.body === "string" && props.body.includes("\n\n")) {
    out.bodyHtml = props.body.split(/\n\n+/).map((p) => `<p>${applyInline(p.trim())}</p>`).join("");
  }
  // items[] → itemsHtml. Suporta dois formatos:
  //  - strings: vira <li> simples (compatibilidade com uso antigo)
  //  - objetos {titulo, texto}: vira linha rica (marcador numerado {{accent}} + título +
  //    corpo curto). Usado pelo carrossel-keeper (checklist/framework). Índice 1-based.
  if (!props.itemsHtml && Array.isArray(props.items)) {
    const allObjects = props.items.every((it) => it && typeof it === "object");
    if (allObjects) {
      out.itemsHtml = props.items
        .map(
          (it, i) =>
            `<li class="list-item"><span class="list-marker">${i + 1}</span>` +
            `<span class="list-text"><span class="list-title">${applyInline(it.titulo ?? "")}</span>` +
            (it.texto ? `<span class="list-body">${applyInline(it.texto)}</span>` : "") +
            `</span></li>`
        )
        .join("");
      out.itemsHtml = `<ul class="list">${out.itemsHtml}</ul>`;
    } else {
      out.itemsHtml = `<ul>${props.items.map((it) => `<li>${applyInline(it)}</li>`).join("")}</ul>`;
    }
  }
  if (!props.rowsHtml && Array.isArray(props.rows)) {
    out.rowsHtml = props.rows
      .map(
        (r) =>
          `<tr><td class="label">${escapeHtml(r.label ?? "")}</td><td class="col-a">${escapeHtml(r.a ?? "")}</td><td class="col-b">${escapeHtml(r.b ?? "")}</td></tr>`
      )
      .join("");
  }
  return out;
}
