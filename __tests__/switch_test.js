const {test} = require("./test_util")

module.exports = eva => {
    test(eva, `
        (begin
            (var data 100)
            (switch ((== data 100) 100)
                    ((< data 100) 200)
                    (else 300))
        )
    `, 100);
}