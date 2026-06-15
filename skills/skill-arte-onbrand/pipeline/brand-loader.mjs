import { readFile } from "node:fs/promises";
import { readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

export async function loadBrand(manualPath, { clienteDir } = {}) {
  const html = await readFile(manualPath, "utf8");

  const rootMatch = html.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) {
    throw new Error(`Manual da marca sem bloco :root com tokens: ${manualPath}`);
  }

  const tokens = {};
  for (const line of rootMatch[1].split(";")) {
    const m = line.match(/--([a-z0-9-]+)\s*:\s*(.+)/i);
    if (m) tokens[m[1].trim()] = m[2].trim().replace(/['"]/g, "");
  }

  const googleFontsLink = (html.match(/<link[^>]*fonts\.googleapis\.com[^>]*>/) || [""])[0];

  const baseDir = clienteDir || dirname(manualPath);
  const logoPath = scanForLogo(baseDir, 3);
  const logoSymbolPath = scanForLogoSymbol(baseDir, 3);

  return {
    tokens,
    googleFontsLink,
    logoPath,
    logoSymbolPath,
    fonts: {
      display: tokens["font-display"] || tokens["font-head"] || "serif",
      body: tokens["font"] || "sans-serif",
      // Fonte de número/dado. Default = display p/ não alterar marcas legadas.
      // Marcas que querem dado monoespaçado definem --font-data no manual.
      data: tokens["font-data"] || tokens["font-display"] || tokens["font-head"] || "serif",
    },
    palette: {
      // Ordem: token legado (g-scheme) -> token nativo (ink/amber) -> default verde.
      // Marcas legadas (g1..g9) seguem idênticas; marcas novas usam nomes nativos.
      bgDeep: tokens["g9"] || tokens["ink-1000"] || tokens["bg-deep"] || "#02431b",
      bgDark: tokens["g7"] || tokens["ink-900"] || tokens["bg-dark"] || "#0a5a28",
      accent: tokens["g5"] || tokens["amber-400"] || tokens["accent"] || "#47a613",
      accentLight: tokens["g4"] || tokens["amber-300"] || tokens["accent-light"] || "#5cb82a",
      light: tokens["g1"] || tokens["ink-50"] || tokens["light"] || "#d4ebc5",
      cream: tokens["bg"] || tokens["ink-1000"] || "#F4EFE6",
      surface: tokens["surface"] || tokens["ink-800"] || "#FDFAF4",
      text: tokens["text-1"] || tokens["ink-50"] || "#1B1F14",
      muted: tokens["text-3"] || tokens["ink-400"] || "#8A7E70",
      amber: tokens["amber"] || tokens["amber-400"] || "#c8a84e",
      red: tokens["red"] || tokens["signal-error-light"] || "#C0483A",
    },
  };
}

function scanForLogo(dir, depthLeft) {
  if (depthLeft < 0 || !existsSync(dir)) return null;
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return null;
  }
  const hits = [];
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      const deep = scanForLogo(full, depthLeft - 1);
      if (deep) hits.push(deep);
    } else if (/logo(marca)?.*\.(svg|png)$/i.test(name) && !/s[ií]mbolo|symbol|[ií]cone|icon/i.test(name)) {
      hits.push(full);
    }
  }
  if (hits.length === 0) return null;
  hits.sort((a, b) => {
    const score = (p) => {
      const name = p.toLowerCase();
      return (
        (/limpo|sem[\s_-]*fundo|transparente|nobg|no-bg/i.test(name) ? -5 : 0) +
        (/\.svg$/i.test(p) ? -3 : 0) +
        (/\.png$/i.test(p) && /sem[\s_-]*fundo|transparente|nobg/i.test(name) ? -4 : 0) +
        (/branc[ao]|white/i.test(name) ? -2 : 0) +
        (/-1\.png$/i.test(name) ? -1 : 0) +
        (/principal/i.test(name) ? -0.5 : 0)
      );
    };
    return score(a) - score(b);
  });
  return hits[0];
}

function scanForLogoSymbol(dir, depthLeft) {
  if (depthLeft < 0 || !existsSync(dir)) return null;
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return null;
  }
  const hits = [];
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      const deep = scanForLogoSymbol(full, depthLeft - 1);
      if (deep) hits.push(deep);
    } else if (/(s[ií]mbolo|symbol|[ií]cone|icon)[^.]*\.(svg|png)$/i.test(name)) {
      hits.push(full);
    }
  }
  if (hits.length === 0) return null;
  hits.sort((a, b) => {
    const score = (p) => (/\.svg$/i.test(p) ? -2 : 0);
    return score(a) - score(b);
  });
  return hits[0];
}
