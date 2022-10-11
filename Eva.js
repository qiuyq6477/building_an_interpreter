const assert = require("assert");
const Environment = require("./Environment")
class Eva {
    constructor(global = new Environment()){
        this.global = global;
    }
    eval(exp, env = this.global){
        // -----------------------------
        // self-evaluating expressions
    
        if (isNumber(exp)){
            return exp;
        }
        
        if (isString(exp)){
            return exp.slice(1,-1);
        }

        // -----------------------------
        // math operations
    
        if (exp[0] === "+"){
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }

        if (exp[0] === "*"){
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        // -----------------------------
        // block expressions
        if (exp[0] === "begin"){
            const blockEnv = new Environment({}, env);
            return this._evalBlock(exp, blockEnv);
        }



        // -----------------------------
        // variables declration
        if (exp[0] === "var"){
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }

        // -----------------------------
        // variables lookup
        if (isVariableName(exp)){
            return env.lookup(exp);
        }

        throw `Umimplemented: ${JSON.stringify(exp)}`
    }

    _evalBlock(block, env){
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach(exp => {
            result = this.eval(exp, env)
        });
        return result;
    }
}

function isNumber(exp)
{
    return typeof exp === "number"
}

function isString(exp)
{
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) == '"'
}

function isVariableName(exp)
{
    return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}


const env = new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: '0.1',
});
const eva = new Eva(env);

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval(["+", 1, 2]), 3);
assert.strictEqual(eva.eval(["+", ["+", 1, 2], 2]), 5);
assert.strictEqual(eva.eval(["*", ["+", 1, 2], 2]), 6);


assert.strictEqual(eva.eval(["var", "x", 2]), 2);
assert.strictEqual(eva.eval("x"), 2);


assert.strictEqual(eva.eval("VERSION"), "0.1");
assert.strictEqual(eva.eval(["var", "isUser", "true"]), true);


assert.strictEqual(eva.eval([
    "begin",
    ["var", "x", 10],
    ["var", "y", 20],
    ["+", ["*", "x", "y"], 20]
]), 220);

assert.strictEqual(eva.eval([
    "begin",
    ["var", "x", 10],
    ["begin", 
        ["var", "x", 20],
        "x"
    ],
    "x",
]), 10);

assert.strictEqual(eva.eval([
    "begin",
    ["var", "value", 10],
    ["var", "result", ["begin", 
        ["var", "x", ["+", "value", 20]],
    ]],
    "result",
]), 30);

console.log("All assertions passed!")