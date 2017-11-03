# Hapi Starter
### A Hapi Starter RDMS with Sequelize ORM

[![Build Status](https://travis-ci.org/nodejs-indonesia/hapi-starter.svg?branch=master)](https://travis-ci.org/nodejs-indonesia/hapi-starter)
[![Dependency Status](https://david-dm.org/nodejs-indonesia/hapi-starter/status.svg?style=flat)](https://david-dm.org/nodejs-indonesia/hapi-starter)
[![Maintainability](https://api.codeclimate.com/v1/badges/9c09ca157f69411fd75b/maintainability)](https://codeclimate.com/github/nodejs-indonesia/hapi-starter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9c09ca157f69411fd75b/test_coverage)](https://codeclimate.com/github/nodejs-indonesia/hapi-starter/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/nodejs-indonesia/hapi-starter/blob/master/LICENSE)


A boilerplate for the **Node.js** web application, which uses RDBS (relational database systems) such as MySQL, PostgreSQL, SQL Server and others.

Project based on and inspired by [Hapi Boilerplate](https://github.com/miguelcobain/hapi-boilerplate).


List of Packages
----------------

| Package              | Description                                                                                                                           |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| bcrypt               | Library for hashing and salting user passwords.                                                                                       |
| boom                 | HTTP-friendly error objects.                                                                                                          |
| config               | Organizes hierarchical configurations for app deployments.                                                                            |
| dotenv               | Loads environment variables from .env for nodejs projects.                                                                            |
| good                 | Hapi plugin to monitor and report on a variety of hapi server events as well as ops information from the host machine.                |
| good-console         | Console reporting for Good process monitor                                                                                            |
| good-file            | File broadcasting for Good process monitor                                                                                            |
| good-squeeze         | Simple transform stream for event filtering with good.                                                                                |
| hapi                 | Web and services application framework                                                                                                |
| hapi-auth-jwt2       | Secure Hapi.js authentication plugin using JSON Web Tokens (JWT) in Headers, Query or Cookies                                         |
| joi                  | Object schema validation                                                                                                              |
| lodash               | A modern JavaScript utility library delivering modularity, performance, & extras.                                                     |
| mysql                | A pure node.js JavaScript Client implementing the MySql protocol.                                                                     |
| require-directory    | Recursively iterates over specified directory, requiring each file, and returning a nested hash structure containing those libraries. |
| rotating-file-stream | Opens a stream.Writable to a file rotated by interval and/or size. A logrotate alternative.                                           |
| sequelize            | An easy-to-use multi SQL dialect ORM for Node.js                                                                                      |
| eslint               | A fully pluggable tool for identifying and reporting on patterns in JavaScript.                                                       |
| eslint-config-hapi   | Shareable ESLint config for the hapi ecosystem.                                                                                       |
| eslint-plugin-hapi   | ESLint plugin containing hapi style guide rules                                                                                       |
| hapi-no-var   | ESLint rule to enforce the usage of var declarations only in try-catch scope                                                                                       |
| lab                  | Simple test utility for Node.js.                                                                                                      |
| nodemon              | Monitor for any changes in your node.js application and automatically restart the server.                                             |
| sqlite3              | Asynchronous, non-blocking SQLite3 bindings for Node.js.                                                                              |


## Usage

Just clone the repository:

```bash
$ git clone https://github.com/nodejs-indonesia/hapi-starter.git
```

Install the dependencies and devDependencies.

```bash
$ cd hapi-starter
$ npm install
```

Setting environment and start the server.

```bash
$ cp .env.example .env
$ npm run dev
```

## Running tests

Run test using lab:

```bash
npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nodejs-indonesia/hapi-starter/issues)



## License

The software licensed under the [MIT license](https://github.com/nodejs-indonesia/hapi-starter/blob/master/LICENSE).
