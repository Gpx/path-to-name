import camelCase from "lodash.camelcase";
import chunk from "lodash.chunk";
import pluralize from "pluralize";

type Method = "get" | "put" | "post" | "patch" | "delete";
type UppercaseMethod = Uppercase<Method>;

const METHOD_TO_VERB: Record<Method, string> = {
  get: "get",
  put: "create",
  post: "update",
  patch: "update",
  delete: "delete",
};

export function pathToName(
  path: string,
  method: Method | UppercaseMethod = "get"
): string {
  const lowercaseMethod = method.toLowerCase() as Method;
  const verb = METHOD_TO_VERB[method];

  const parts = path.split("/").filter(Boolean);
  const chunks = chunk(parts, 2);
  const fragments = chunks.map((chunk) => buildChunk(chunk, lowercaseMethod));

  return camelCase(verb + "-" + fragments.reverse().join("-for-"));
}

function buildChunk(
  parts: [string, string] | [string],
  method: Method
): string {
  if (parts.length === 1) {
    return camelCase(
      method === "put" ? pluralize.singular(parts[0]) : parts[0]
    );
  }
  return camelCase(
    `${pluralize.singular(parts[0])}-by-${removeRepeteadPrefix(
      parts[0],
      parts[1]
    )}`
  );
}

function removeRepeteadPrefix(prefix, value) {
  const singularPrefix = pluralize.singular(prefix).toLowerCase();
  const rawValue = pluralize.singular(value.toLowerCase().replace(/^:/, ""));
  return rawValue.startsWith(singularPrefix)
    ? rawValue.slice(singularPrefix.length)
    : rawValue;
}
