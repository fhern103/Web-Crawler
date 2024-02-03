const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', () => {
    const input = {
        'https://github.com/aalva456': 1,
        'https://github.com/fhern103': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://github.com/fhern103', 3],
        ['https://github.com/aalva456', 1]
    ]

    expect(actual).toEqual(expected)
})
