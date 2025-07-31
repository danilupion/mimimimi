## Available Scripts

In the project directory, you can run:

### `yarn start_dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner.\

### `yarn test:watch`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn lint`

Lints the codebase using ESLint.

### `yarn lint:fix`

Lints the codebase using ESLint and fixes any errors.

### `yarn prettify`

Prettifies the codebase using Prettier.

## Cloud

### Docker

#### Image creation

```bash
docker build -t mimimimi/web -f Dockerfile  .
```

#### Debugging the images

```bash
docker container run -it --rm mimimimi/web /bin/sh
```

### Helm

#### Installing

```bash
helm install -n mimimimi --create-namespace mimimimi ./helm-chart
```

#### Uninstalling

```bash
helm uninstall -n mimimimi mimimimi
```


### Helmfile

Our setup works with environments, so assuming you created a values.yaml in the following path:

```
environments
  local
    values.yaml
```

#### Installation

```bash
helmfile apply -e local
```

#### Uninstalling

```bash
helmfile destroy -e local
```