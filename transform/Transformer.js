

class Transformer{
    transformDefToVarLambda(defExp) {
        const [_tag, name, param, body] = defExp

        const varExp = ["var", name, ["lambda", param,  body]];

        return varExp;
    }


    transformSwitchToIf(switchExp) {
        const [_tag, ...cases] = switchExp;

        const ifExp = ["if", null, null, null];

        let currentExp = ifExp;
        for (let i = 0; i < cases.length-1; i++){
            const [condition, block] = cases[i];
            currentExp[1] = condition;
            currentExp[2] = block

            let next = cases[i+1];
            let [nextCondition, nextBlock] = next;
            if (nextCondition === "else"){
                currentExp[3] = nextBlock;
            }
            else{
                currentExp[3] = ["if", null, null, null];
                currentExp = currentExp[3];
            }
        }

        return ifExp;
    }

    transformForToWhile(forExp) {
        const [_tag, init, condition, modifier, body] = forExp;
        const whileExp = ["begin", init,
                        "while", condition, body, modifier];
        return whileExp;
    }

    transformIncToSet(incExp) {
        const [_tag, exp] = incExp;
        return ['set', exp, ['+', exp, 1]];
    }


    transformDecToSet(incExp) {
        const [_tag, exp] = incExp;
        return ['set', exp, ['-', exp, 1]];
    }

    transformIncValToSet(incExp) {
        const [_tag, exp, val] = incExp;
        return ['set', exp, ['+', exp, val]];
    }


    transformDecValToSet(incExp) {
        const [_tag, exp, val] = incExp;
        return ['set', exp, ['-', exp, val]];
    }
}


module.exports = Transformer;