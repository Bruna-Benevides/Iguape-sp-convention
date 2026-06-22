#!/usr/bin/env bash
# Script para deploy no Vercel via CLI
# Requer: npm install -g vercel (ou usar npx vercel)

if [ -z "$VERCEL_TOKEN" ]; then
  echo "Erro: defina a variável de ambiente VERCEL_TOKEN antes de rodar."
  echo "Ex: export VERCEL_TOKEN=seu_token_aqui"
  exit 1
fi

# deploy em modo production
npx vercel --prod --token "$VERCEL_TOKEN"
