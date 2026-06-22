# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Depoimentos

Funcionalidade de depoimentos removida — o projeto agora funciona sem backend.

## Deploy no Vercel

Passos básicos para publicar no Vercel:

1. Faça commit e push do seu repositório para GitHub/GitLab/Bitbucket.
2. No Vercel, importe o repositório e crie um novo projeto.
3. Adicione as variáveis de ambiente listadas acima em Settings → Environment Variables.
4. O Vercel executará `npm run build` automaticamente e publicará o site.

Se preferir, você também pode servir o build localmente para testar:

```bash
npm run build
npx serve -s build
```

### Deploy automático via GitHub Actions → Vercel

Você pode automatizar deploys configurando o GitHub Actions (pipeline já incluído em `.github/workflows/deploy-vercel.yml`). Para usar it:

1. No Vercel, gere um token de deploy (Settings → Tokens).
2. No repositório GitHub, vá em Settings → Secrets and variables → Actions e adicione os seguintes *secrets*:
	- `VERCEL_TOKEN` — token gerado no Vercel
	- `VERCEL_ORG_ID` — opcional, fornecido pelo Vercel (ajuda a garantir deploy ao projeto correto)
	- `VERCEL_PROJECT_ID` — opcional, fornece identificação do projeto no Vercel
3. Faça push para a branch `main` — o workflow irá construir e executar `npx vercel --prod` automaticamente.

Observação: se preferir não usar `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`, geralmente apenas `VERCEL_TOKEN` é suficiente quando o projeto já está ligado à conta Vercel.

## Deploy via CLI (alternativa)

Se preferir usar o CLI do Vercel localmente em vez do workflow, há scripts auxiliares em `scripts/`:

- `scripts/deploy_vercel.sh`: faz `npx vercel --prod` usando a variável `VERCEL_TOKEN`.
- `scripts/set_vercel_env.sh`: lê um `.env.local` e tenta adicionar as variáveis ao Vercel via `npx vercel env add` (requer `VERCEL_TOKEN`).

Exemplo local:

```bash
export VERCEL_TOKEN=seu_token_aqui
./scripts/set_vercel_env.sh .env.local
./scripts/deploy_vercel.sh
```

Nota: esses scripts chamam `npx vercel` — você será autenticado pelo token e o projeto deve já estar vinculado à conta Vercel.

## Teste local em tempo real (sem Firebase)

Para facilitar desenvolvimento local sem o Firestore, o app implementa um fallback com `BroadcastChannel` que sincroniza novos depoimentos entre abas do navegador. Isso significa que:

- Se o Firestore não estiver configurado, ao enviar um novo depoimento em uma aba, outras abas abertas na mesma máquina também receberão o depoimento automaticamente (simulação em tempo real).
- Se o navegador não suportar `BroadcastChannel`, o fallback continua sendo `localStorage` e será necessário recarregar para ver atualizações.


