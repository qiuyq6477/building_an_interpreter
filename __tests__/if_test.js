const assert = require("assert")


module.exports = eva => {
    assert.strictEqual(eva.eval([
        "begin",
        ["var", "x", 10],
        ["var", "y", 20],
        ["if", [">", "x", "y"],
            ["set", "x", 100],
            ["set", "x", 200]
        ],
        "x"
    ]), 200)
}