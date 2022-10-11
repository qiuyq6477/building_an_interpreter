const {test} = require("./test_util")

module.exports = eva => {
    test(eva, `
        (begin
            (def square (x)
                (* x x))

            (square 2)
        )
    `, 4);
    

}