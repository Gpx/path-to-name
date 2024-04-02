import { describe, it, expect, expectTypeOf } from "vitest";
import { pathToName } from "./index";

describe("pathToName", () => {
  it("should be a function that accepts a string and an optional method and returns a string", () => {
    expectTypeOf(pathToName).toBeFunction();

    expectTypeOf(pathToName).parameter(0).toBeString();
    expectTypeOf(pathToName)
      .parameter(1)
      .toEqualTypeOf<
        | "get"
        | "GET"
        | "put"
        | "PUT"
        | "post"
        | "POST"
        | "patch"
        | "PATCH"
        | "delete"
        | "DELETE"
        | undefined
      >();

    expectTypeOf(pathToName).returns.toBeString();
  });

  it.each`
    path                                                 | method       | name
    ${"/current_user"}                                   | ${undefined} | ${"getCurrentUser"}
    ${"/users"}                                          | ${undefined} | ${"getUsers"}
    ${"/users/:id"}                                      | ${undefined} | ${"getUserById"}
    ${"/users/:id/products"}                             | ${undefined} | ${"getProductsForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${undefined} | ${"getProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${undefined} | ${"getProductByIdForUserById"}
    ${"/users/:id/products/:id/order"}                   | ${undefined} | ${"getOrderForProductByIdForUserById"}
    ${"/users/:id/products/:id/orders"}                  | ${undefined} | ${"getOrdersForProductByIdForUserById"}
    ${"/users/:id/products/:id/orders/:id"}              | ${undefined} | ${"getOrderByIdForProductByIdForUserById"}
    ${"/users/:id/products/:id/orders/:id/invoices"}     | ${undefined} | ${"getInvoicesForOrderByIdForProductByIdForUserById"}
    ${"/users/:id/products/:id/orders/:id/invoices/:id"} | ${undefined} | ${"getInvoiceByIdForOrderByIdForProductByIdForUserById"}
    ${"/users"}                                          | ${"get"}     | ${"getUsers"}
    ${"/users/:id"}                                      | ${"get"}     | ${"getUserById"}
    ${"/users/:id/products"}                             | ${"get"}     | ${"getProductsForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${"get"}     | ${"getProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${"get"}     | ${"getProductByIdForUserById"}
    ${"/users"}                                          | ${"put"}     | ${"createUser"}
    ${"/users/:id"}                                      | ${"put"}     | ${"createUserById"}
    ${"/users/:id/products"}                             | ${"put"}     | ${"createProductForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${"put"}     | ${"createProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${"put"}     | ${"createProductByIdForUserById"}
    ${"/users"}                                          | ${"post"}    | ${"updateUsers"}
    ${"/users/:id"}                                      | ${"post"}    | ${"updateUserById"}
    ${"/users/:id/products"}                             | ${"post"}    | ${"updateProductsForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${"post"}    | ${"updateProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${"post"}    | ${"updateProductByIdForUserById"}
    ${"/users"}                                          | ${"patch"}   | ${"updateUsers"}
    ${"/users/:id"}                                      | ${"patch"}   | ${"updateUserById"}
    ${"/users/:id/products"}                             | ${"patch"}   | ${"updateProductsForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${"patch"}   | ${"updateProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${"patch"}   | ${"updateProductByIdForUserById"}
    ${"/users"}                                          | ${"delete"}  | ${"deleteUsers"}
    ${"/users/:id"}                                      | ${"delete"}  | ${"deleteUserById"}
    ${"/users/:id/products"}                             | ${"delete"}  | ${"deleteProductsForUserById"}
    ${"/users/:user_id/products/:product_id"}            | ${"delete"}  | ${"deleteProductByIdForUserById"}
    ${"/users/:id/products/:id"}                         | ${"delete"}  | ${"deleteProductByIdForUserById"}
  `(
    "should return $name when method is $method and path is $path",
    ({ path, method, name }) => {
      expect(pathToName(path, method)).toBe(name);
    }
  );
});
