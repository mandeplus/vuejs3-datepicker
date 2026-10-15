# Playground

Vite app that installs the packed library tarball, the same contents npm publishes, and runs browser tests against it with Playwright. Not part of the published package.

## Run the browser tests

From the repository root:

```sh
npm ci --prefix playground
npx --prefix playground playwright install chromium
npm --prefix playground run test:e2e
```

`test:e2e` builds the library, packs it, installs the tarball into the playground, type-checks and builds the app, then runs the tests in several browser time zones.

To use an installed Google Chrome instead of the bundled Chromium:

```sh
PLAYWRIGHT_CHANNEL=chrome npm --prefix playground run test:e2e
```

## Try the package manually

```sh
cd playground
npm run build:lib
npm run install:package
npm run dev
```

Rerun `npm run build:lib` and `npm run install:package` after changing the library source.
