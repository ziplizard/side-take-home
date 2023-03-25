# Acceptance criteria

- [x] Build a REST API using Nodejs and SQLite to manage a property list.

- [x] The API should enable users to perform CRUD actions (create, read, update, delete) on property data from the database.

- [x] Requests should be validated where applicable.

- [x] Invalid requests and other errors should be handled appropriately along with the appropriate HTTP status codes. You may use your discretion regarding error responses themselves.

- [x] Where applicable, endpoints returning multiple records should be filterable and support pagination. You may choose any pagination strategy you are familiar with.

- [x] The SQLite database is pre-seeded with data from the SimplyRETS API get_properties endpoint.

- [x] Encouraged you to use TypeORM since we use it heavily at Side. If you have a different approach, feel free to proceed, but please document the reasons / tradeoffs.

# Getting started

With latest Node LTS installed, run the following commands:

```sh
yarn install && yarn start
```

# Postman

A [Postman Collection](postman_collection.json) has been provided for you to easily consume this API.
