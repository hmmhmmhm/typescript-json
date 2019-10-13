"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.TypeGeneral = function (type, opt, combine) {
    if (opt === void 0) { opt = {}; }
    //@ts-ignore
    return tslib_1.__assign({ type: type, default: opt.default }, combine);
};
exports.TypeString = function (opt) {
    if (opt === void 0) { opt = {}; }
    return exports.TypeGeneral(String, opt, {
        default: opt.default,
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        regex: opt.regex,
        clip: opt.clip,
        enum: opt.enum,
        stringTransform: opt.stringTransform
    });
};
exports.TypeNumber = function (opt) {
    if (opt === void 0) { opt = {}; }
    return exports.TypeGeneral(Number, opt, {
        default: opt.default,
        min: opt.min,
        max: opt.max,
    });
};
exports.TypeArray = function (opt) {
    if (opt === void 0) { opt = {}; }
    return exports.TypeGeneral(Array, opt, {
        default: opt.default,
        arrayType: opt.arrayType,
        unique: opt.unique,
    });
};
var schema_object_1 = tslib_1.__importDefault(require("schema-object"));
exports.TypescriptJSON = function (schema, input) {
    var SchemaInstance = new schema_object_1.default(schema);
    return new SchemaInstance(input);
};
