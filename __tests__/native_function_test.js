const {test} = require("./test_util")

module.exports = eva => {
    test(eva, `(+ 1 5)`, 6);
    test(eva, `(- (* 2 3) 5)`, 1);

    test(eva, `(< 1 5)`, true);

    test(eva, `(> 1 5)`, false);

}