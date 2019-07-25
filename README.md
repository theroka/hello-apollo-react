# hello-apollo-react

Small example project for React/Apollo/GraphQL.
Uses ["hello-apollo"](https://github.com/theroka/hello-apollo) as GraphQL API server.
Just displays all book titles, requested with GraphQL.

## Setup

**Disclaimer**: Typescript version is fixed to v3.5 (see package.json) since Typescript 3.6 does not has the GlobalFetch type which is used by apollo-client respectively apollo-link-http.

To install dependencies
```
yarn install
```

To build project
```
yarn gulp
```
Runs gulp default task through node_modules/.bin/gulp.
Output is written to ./dist
Serve these files with a webserver

Example
```
python -m http.server 8080
```
