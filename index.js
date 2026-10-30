//
// eslintrc (legacy) config, for ESLint < 9 (or ESLint 9 with ESLINT_USE_FLAT_CONFIG=false)
//
var filterRules = require("./builtin-rules").filterRules;

module.exports = {
    "extends": "eslint:recommended",
    "rules": filterRules(require("./rules"))
};
