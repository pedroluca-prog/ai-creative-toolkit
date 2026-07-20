---
description: Constrói ou opera a linha editorial de um cliente (linha → newsjacking → pautas pontuadas → carrossel) via skill-linha-editorial.
argument-hint: <cliente> [linha|pautas|produz "<pauta>"]
---

Invoque a skill `skill-linha-editorial` para o cliente `$1`.

1. Se não existir `skills/skill-linha-editorial/config/exemplos/$1.md`, rode a **Fase 0** (instanciar o perfil a partir do template) antes de qualquer coisa e peça confirmação humana.
2. Roteie pela intenção em `$2` (default = `linha`):
   - `linha` → Fase 1 (escrever a linha editorial a partir do perfil).
   - `pautas` → Fase 2 (newsjacking com `editorial-researcher` por veia → `editorial-estrategista` pontua → banco de pautas; humano escolhe).
   - `produz "<pauta>"` → Fase 3 (narrativa GATE 1 → arquitetura GATE 2 → render via skill-arte-onbrand → auditoria).

Respeite todos os gates humanos. Nunca hardcode marca — tudo vem de `config/exemplos/$1.md`.
