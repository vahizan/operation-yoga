# Next.js + Cypress

This example shows how to configure Cypress to work with Next.js.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-cypress)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cypress&project-name=with-cypress&repository-name=with-cypress)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-cypress with-cypress-app
```

## Build docker image

```bash
docker build -t operation-yoga:latest -f ./docker/[NODE_ENV]/Dockerfile .
```

## Tag docker image

```bash
 docker tag <IMAGE_ID> <URL>/httpd:version1.0

```

## Tag docker image with heroku repo

```bash
 docker tag <IMAGE_ID> registry.heroku.com/<HEROKU_APP_NAME>/web

```

## Pushing to Heroku 

```bash
docker push registry.heroku.com/<HEROKU_APP_NAME>/web
```

## Releasing in Heroku
```bash
heroku login
heroku container:login
heroku container:release web --app=<HEROKU_APP_NAME>
```