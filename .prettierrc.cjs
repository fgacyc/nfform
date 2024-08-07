module.exports = {
    "plugins": [
        require.resolve("@trivago/prettier-plugin-sort-imports")
    ],
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2,
    "importOrder": [
        "^@/(.*)$",
        "^[./]"
    ],
    "importOrderSeparation": true,
    "importOrderSortSpecifiers": true
}