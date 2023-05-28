# university-manage-ment

###### Project Setup

-> npm init - y (creates package.json file) "main": "src/server.ts" (in package.json file) (this is the entry point of the application) (this is the file which will be executed when we run the application)

-> yarn add -D typescript (installs typescript as dev dependency) because we are using typescript for the development purpose only not for the production purpose. in production we use javascript.

-> yarn add mongoose express (installs mongoose and express as dependencies)

-> tsc --init (creates tsconfig.json file) (this file contains the configuration for the typescript compiler)

-> yarn add dotenv (installs dotenv as dependency) (dotenv is used to load environment variables from a .env file into process.env)

-> yarn add -D ts-node (installs ts-node as dev dependency) ts-node is a typescript execution environment and REPL for node.js, with an API compatible with node.js require. ts-node transpiles your typescript code on the fly and runs the javascript.
