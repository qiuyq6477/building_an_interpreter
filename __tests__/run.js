const Eva = require("../Eva")
const Environment = require("../Environment")


const tests = [
    require("./self_eval_test"),
    require("./variables_test"),
    require("./math_test"),
    require('./blocks_test'),
];



const env = new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: '0.1',
});
const eva = new Eva(env);

tests.forEach(test => test(eva));

console.log("All assertions passed!")