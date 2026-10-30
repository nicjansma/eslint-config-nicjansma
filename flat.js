//
// Flat config, for ESLint >= 9 (or ESLint 8.57+ using eslint.config.js)
//
var builtinRules = require("./builtin-rules");
var rules = require("./rules");

var recommended = builtinRules.getRecommendedRules();
var merged = {};

Object.keys(recommended).forEach(function(name) {
    merged[name] = recommended[name];
});

Object.keys(rules).forEach(function(name) {
    merged[name] = rules[name];
});

module.exports = {
    "rules": builtinRules.filterRules(merged)
};
