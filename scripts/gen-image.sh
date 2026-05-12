#!/usr/bin/env bash
# Gera imagens via OpenAI gpt-image-2 (substitui gpt-image-1 a partir de 2026-05-05).
# Usa o melhor modelo de imagem da OpenAI — instruction following mais forte, texto em
# imagem mais legível, edição cirúrgica via images.edit. Compatível com prompts construídos
# pela skill image-prompt-generator. API key lida de ~/.config/openai/api-key (chmod 600).
#
# REQUISITO: organização OpenAI verificada. Se você ver erro de "organization must be
# verified", vá em https://platform.openai.com/settings/organization/general → "Verify
# Organization" e aguarde até 15min de propagação.
#
# Uso:
#   bash gen-image.sh "<prompt>" "<output.png>" [quality] [size]
#
# Args:
#   $1 prompt — descrição da imagem (em inglês, sem texto/logo crítico — use skill-arte-onbrand)
#   $2 output — caminho .png onde salvar
#   $3 quality — low | medium | high | auto (default: auto)
#   $4 size — 1024x1024 | 1536x1024 (landscape) | 1024x1536 (portrait) | auto (default: 1024x1024)
#
# Custos aproximados por imagem 1024x1024 (ordem de grandeza similar ao gpt-image-1):
#   low:    ~$0.011
#   medium: ~$0.042
#   high:   ~$0.167
#   auto:   modelo decide
#
# Sai com exit 0 em sucesso, exit 1 em erro. Loga em ~/Library/Logs/azb-os-image-gen.log.

set -uo pipefail

LOG="$HOME/Library/Logs/azb-os-image-gen.log"
mkdir -p "$(dirname "$LOG")"
ts() { date '+%Y-%m-%d %H:%M:%S'; }

prompt="${1:-}"
output="${2:-}"
quality="${3:-auto}"
size="${4:-1024x1024}"

if [[ -z "$prompt" ]] || [[ -z "$output" ]]; then
  echo "Uso: bash gen-image.sh \"<prompt>\" \"<output.png>\" [quality] [size]" >&2
  echo "[$(ts)] ERROR args insuficientes" >> "$LOG"
  exit 1
fi

KEY_FILE="$HOME/.config/openai/api-key"
if [[ ! -f "$KEY_FILE" ]]; then
  echo "API key não encontrada em $KEY_FILE" >&2
  echo "[$(ts)] ERROR api-key ausente" >> "$LOG"
  exit 1
fi

API_KEY="$(cat "$KEY_FILE")"

# Validações
case "$quality" in
  low|medium|high|auto) ;;
  *) echo "quality inválido: $quality (use low|medium|high|auto)" >&2; exit 1 ;;
esac

case "$size" in
  1024x1024|1536x1024|1024x1536|auto) ;;
  *) echo "size inválido: $size" >&2; exit 1 ;;
esac

# Garante que o diretório de output existe
mkdir -p "$(dirname "$output")"

echo "[$(ts)] START gen-image: $output (q=$quality, s=$size)" >> "$LOG"

# Chama a API. gpt-image-2 sempre retorna b64_json (não URL).
response="$(curl -sS https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
  "model": "gpt-image-2",
  "prompt": $(jq -Rs . <<< "$prompt"),
  "n": 1,
  "size": "$size",
  "quality": "$quality"
}
EOF
)"

curl_exit=$?
if [[ $curl_exit -ne 0 ]]; then
  echo "curl falhou (exit $curl_exit)" >&2
  echo "[$(ts)] ERROR curl exit=$curl_exit" >> "$LOG"
  exit 1
fi

# Checa erro da API
api_error="$(echo "$response" | jq -r '.error.message // empty' 2>/dev/null)"
if [[ -n "$api_error" ]]; then
  if [[ "$api_error" == *"organization must be verified"* ]]; then
    cat >&2 <<'MSG'
✗ gpt-image-2 BLOQUEADO: organização OpenAI ainda não verificada.

Para destravar:
1. Acesse https://platform.openai.com/settings/organization/general
2. Clique em "Verify Organization"
3. Aguarde até 15min para propagação

(A página /api-keys mostrar "Active" NÃO destrava — é verificação de org separada.)
MSG
  else
    echo "OpenAI error: $api_error" >&2
  fi
  echo "[$(ts)] ERROR api: $api_error" >> "$LOG"
  exit 1
fi

# Extrai b64 e decodifica
b64="$(echo "$response" | jq -r '.data[0].b64_json // empty' 2>/dev/null)"
if [[ -z "$b64" ]]; then
  echo "Resposta inesperada (sem b64_json):" >&2
  echo "$response" | head -c 500 >&2
  echo "[$(ts)] ERROR resposta sem b64" >> "$LOG"
  exit 1
fi

# Decode base64 → PNG
echo "$b64" | base64 -d > "$output"

if [[ ! -s "$output" ]]; then
  echo "Arquivo gerado vazio: $output" >&2
  echo "[$(ts)] ERROR output vazio" >> "$LOG"
  exit 1
fi

bytes=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
echo "[$(ts)] OK $output ($bytes bytes, q=$quality, s=$size)" >> "$LOG"
echo "✓ Imagem salva em $output ($bytes bytes)"
exit 0
