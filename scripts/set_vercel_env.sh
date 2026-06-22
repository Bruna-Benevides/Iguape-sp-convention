#!/usr/bin/env bash
# Script helper para adicionar variáveis de ambiente no Vercel via CLI
# Requer: npm i -g vercel OR use npx vercel
# Uso: export VERCEL_TOKEN=seu_token && ./scripts/set_vercel_env.sh .env.local

if [ -z "$VERCEL_TOKEN" ]; then
  echo "Erro: defina VERCEL_TOKEN"
  exit 1
fi

if [ -z "$1" ]; then
  echo "Uso: $0 caminho/para/.env.local"
  exit 1
fi

ENVFILE="$1"
if [ ! -f "$ENVFILE" ]; then
  echo ".env file não encontrado: $ENVFILE"
  exit 1
fi

while IFS= read -r line; do
  # ignora linhas vazias e comentários
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  KEY=${line%%=*}
  VALUE=${line#*=}
  echo "Adicionando $KEY to Vercel..."
  npx vercel env add "$KEY" "$VALUE" production --token "$VERCEL_TOKEN" || true
done < "$ENVFILE"

echo "Concluído. Verifique no painel do Vercel se as variáveis foram adicionadas."
