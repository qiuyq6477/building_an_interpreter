const assert = require("assert");

module.exports = eva => {

    assert.strictEqual(eva.eval(["var", "x", 2]), 2);
    assert.strictEqual(eva.eval("x"), 2);
    
    
    assert.strictEqual(eva.eval("VERSION"), "0.1");
    assert.strictEqual(eva.eval(["var", "isUser", "true"]), true);
}