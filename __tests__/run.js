const Eva = require("../Eva")
const Environment = require("../Environment")


const tests = [
    require("./self_eval_test"),
    require("./variables_test"),
    require("./math_test"),
    require('./blocks_test'),
    require('./if_test'),
    require('./while_test'),
    require('./native_function_test'),
    require("./user_defined_function_test"),
    require("./lambda_function_test"),
    
];


const eva = new Eva();

tests.forEach(test => test(eva));

console.log("All assertions passed!")