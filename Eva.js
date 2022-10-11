
const Environment = require("./Environment")
class Eva {
    constructor(global = globalEnv){
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

        if (exp[0] === "set"){
            const [_, name, value] = exp;
            return env.assign(name, this.eval(value, env))
        }
        // -----------------------------
        // variables lookup
        if (isVariableName(exp)){
            return env.lookup(exp);
        }

        if (exp[0] === "if"){
            const [_tag, condition, consequent, alternate] = exp;
            if(this.eval(condition, env)){
                return this.eval(consequent, env);
            }
            else{
                return this.eval(alternate, env);
            }
        }

        if (exp[0] === "while"){
            const [_tag, condition, body] = exp;
            let result;
            while(this.eval(condition, env)){
                result = this.eval(body, env)
            }
            return result;
        }

        if (exp[0] === "def"){
            const [_tag, name, param, body] = exp

            const varExp = ["var", name, ["lambda", param,  body]];

            return this.eval(varExp, env);
        }

        if (exp[0] === "lambda"){
            const [_tag, param, body] = exp

            const fn = {
                param: param,
                body: body,
                env: env,
            };

            return fn;
        }

        if (Array.isArray(exp)){
            const fn = this.eval(exp[0], env);
            const args = exp
                    .slice(1)
                    .map(arg => this.eval(arg, env));
                        
            // natived function
            if (typeof fn === "function"){
                return fn(...args);
            }
            
            // user-defined-function
            const activationRecord = {};

            fn.param.forEach((param, index) => {
                activationRecord[param] = args[index];
            })

            const activationEnv = new Environment(activationRecord, fn.env); // static scope, if env then dynamic scope

            return this._evalBody(fn.body, activationEnv);
        }


        throw `Umimplemented: ${JSON.stringify(exp)}`
    }

    _evalBody(body, env){
        if (body[0] === "begin"){ // prevent create another env
            return this._evalBlock(body, env);
        }
        return this.eval(body, env);
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
    return typeof exp === "string" && /^[+\-*/<>=a-zA-Z][+\-*/<>=a-zA-Z0-9_]*$/.test(exp);
}



const globalEnv = new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: '0.1',

    '+'(op1, op2){
        return op1 + op2;
    },

    '-'(op1, op2 = null){
        if (op2 == null){
            return -op1;
        }
        return op1 - op2;
    },

    '*'(op1, op2){
        return op1 * op2;
    },

    '/'(op1, op2){
        return op1 / op2;
    },

    '>'(op1, op2){
        return op1 > op2;
    },

    '>='(op1, op2){
        return op1 >= op2;
    },

    '<'(op1, op2){
        return op1 < op2;
    },

    '<='(op1, op2){
        return op1 <= op2;
    },

    '=='(op1, op2){
        return op1 === op2;
    },

    'print'(...args){
        console.log(...args);
    },

});

module.exports = Eva;