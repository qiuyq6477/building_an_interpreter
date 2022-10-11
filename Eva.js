const assert = require("assert");

class Eva {
    eval(exp){
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
    
        if (exp[0] == "+"){
            return this.eval(exp[1]) + this.eval(exp[2]);
        }

        if (exp[0] == "*"){
            return this.eval(exp[1]) * this.eval(exp[2]);
        }



        
        throw "Umimplemented"
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

const eva = new Eva();
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval(["+", 1, 2]), 3);
assert.strictEqual(eva.eval(["+", ["+", 1, 2], 2]), 5);
assert.strictEqual(eva.eval(["*", ["+", 1, 2], 2]), 6);


console.log("All assertions passed!")