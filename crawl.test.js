const {normalizeUrl} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol', () => {
    const input = 'https://github.com/fhern103'
    const actual = normalizeUrl(input)
    const expected = 'github.com/fhern103'

    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing /', () => {
    const input = 'https://github.com/fhern103/'
    const actual = normalizeUrl(input)
    const expected = 'github.com/fhern103'

    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals', () => {
    const input = 'https://GITHUB.CoM/fhern103/'
    const actual = normalizeUrl(input)
    const expected = 'github.com/fhern103'

    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', () => {
    const input = 'http://github.com/fhern103'
    const actual = normalizeUrl(input)
    const expected = 'github.com/fhern103'

    expect(actual).toEqual(expected)
})