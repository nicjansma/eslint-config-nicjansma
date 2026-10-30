//
// Helpers for adapting the config to the installed version of ESLint
//

/**
 * Gets the Map of rules built into the installed ESLint
 *
 * @returns {Map|null} Built-in rules, or null if they can't be determined (ESLint < 7)
 */
function getBuiltinRules() {
    try {
        return require("eslint/use-at-your-own-risk").builtinRules;
    } catch (e) {
        return null;
    }
}

/**
 * Removes rules that the installed ESLint doesn't have (e.g. valid-jsdoc was removed in ESLint 9)
 *
 * @param {object} rules Rules config
 *
 * @returns {object} Rules config with only rules that exist
 */
function filterRules(rules) {
    var builtinRules = getBuiltinRules();

    if (!builtinRules) {
        return rules;
    }

    return Object.keys(rules).reduce(function(filtered, name) {
        if (builtinRules.has(name)) {
            filtered[name] = rules[name];
        }

        return filtered;
    }, {});
}

/**
 * Gets the equivalent of eslint:recommended for the installed ESLint.
 *
 * ESLint 10 no longer bundles @eslint/js, so this is built from rule metadata
 * (which is how @eslint/js generates it).
 *
 * @returns {object} Rules config
 */
function getRecommendedRules() {
    var builtinRules = getBuiltinRules();
    var recommended = {};

    if (!builtinRules) {
        return recommended;
    }

    builtinRules.forEach(function(rule, name) {
        if (rule.meta && rule.meta.docs && rule.meta.docs.recommended === true && !rule.meta.deprecated) {
            recommended[name] = "error";
        }
    });

    return recommended;
}

module.exports = {
    filterRules: filterRules,
    getRecommendedRules: getRecommendedRules
};
