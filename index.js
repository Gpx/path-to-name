"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToName = void 0;
var lodash_camelcase_1 = require("lodash.camelcase");
var lodash_chunk_1 = require("lodash.chunk");
var pluralize_1 = require("pluralize");
var METHOD_TO_VERB = {
    get: "get",
    put: "create",
    post: "update",
    delete: "delete",
};
function pathToName(path, method) {
    if (method === void 0) { method = "get"; }
    var verb = METHOD_TO_VERB[method];
    var parts = path.split("/").filter(Boolean);
    var chunks = (0, lodash_chunk_1.default)(parts, 2);
    var fragments = chunks.map(buildChunk);
    return (0, lodash_camelcase_1.default)(verb + "-" + fragments.reverse().join("-for-"));
}
exports.pathToName = pathToName;
function buildChunk(parts) {
    if (parts.length === 1) {
        return (0, lodash_camelcase_1.default)(parts[0]);
    }
    return (0, lodash_camelcase_1.default)("".concat(pluralize_1.default.singular(parts[0]), "-by-").concat(removeRepeteadPrefix(parts[0], parts[1])));
}
function removeRepeteadPrefix(prefix, value) {
    var singularPrefix = pluralize_1.default.singular(prefix).toLowerCase();
    var rawValue = pluralize_1.default.singular(value.toLowerCase().replace(/^:/, ""));
    return rawValue.startsWith(singularPrefix)
        ? rawValue.slice(singularPrefix.length)
        : rawValue;
}
