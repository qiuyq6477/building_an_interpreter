const assert = require('assert');
const {test} = require('./test_util');

module.exports = eva => {

    test(eva,
    `
    (begin
        (import Math)
        ((prop Math abs) (- 10))
    )

    `,
    10);

    test(eva,
    `
    (begin
        (import Math)
        (var abs (prop Math abs))
        (abs (- 10))
    )
    `,
    10);

    test(eva,
    `
    (begin
        (import Math)
        (prop Math MAX_VALUE)
    )
    `,
    1000);

    test(eva,
    `
        (begin
            (import (MAX_VALUE abs) Math)
            (abs (- 10))
            MAX_VALUE
        )
    `,
    1000);
};