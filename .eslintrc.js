module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "commonjs": true,
        "browser": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "error",
        "valid-jsdoc": "error",
        "max-len": ["error", { "code": 120 }]
    }
};
