# path-to-name

Converts a path into a name.

Let's start with an example:

```ts
import { pathToName } from "@gpx/path-to-name";

pathToName("/user"); // => 'getUser'
pathToName("/users"); // => 'getUsers'
pathToName("/users/:user_id"); // => 'getUserById'
pathToName("/users/:user_id/products"); // => 'getProductsForUserById'
pathToName("/users/:user_id/products/:product_id"); // => 'getProductByIdForUserById'
```

That's pretty much it. Pass a path and get back a name for it. The name is camel-cased and follows the RESTful naming conventions.

There's only a second optional argument `method`. It matches the HTTP method and can only have values of `GET`, `POST`, `PUT`, `PATCH`, and, `DELETE`. If the method is not provided, it defaults to `GET`.

```ts
pathToName("/users", "PUT"); // => 'createUser'
pathToName("/users/:id", "get"); // => 'getUserById'
pathToName("/users/:id", "post"); // => 'updateUserById'
pathToName("/users/:id", "patch"); // => 'updateUserById'
pathToName("/users/:id", "delete"); // => 'deleteUserById'
```
