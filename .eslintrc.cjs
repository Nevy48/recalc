module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": 2,
        "no-undef": 2,
        "no-else-return": 2,
        "no-empty-function": 2,
        "no-eq-null": 2,
        "eqeqeq": 2,
        "dot-notation": 2,
        "curly": 2,
        "complexity": 2
    },
    "overrides": [
        {
            "files": ["src/public/**/*.js"],
            "env": {
                "es2021": true,
                "browser": true,
            }
        }
    ]
}
