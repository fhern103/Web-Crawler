const {normalizeUrl, getUrlsFromHTML} = require('./crawl')
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

test('get absolute URLs', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href=https://github.com/fhern103/>
                Fidel Hernandez Github page
            </a>
            <a href=https://github.com/Felicity05>
                Arelys Alvarez Github page
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'http://github.com/fhern103'
    const actual = getUrlsFromHTML(inputHtmlBody, inputBaseUrl)
    const expected = ['https://github.com/fhern103/', 'https://github.com/Felicity05']

    expect(actual).toEqual(expected)
})

test('get relative URLs', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href=/fhern103/>
                Fidel Hernandez Github page
            </a>
            <a href=/Felicity05/>
                Arelys Alvarez Github page
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://github.com'
    const actual = getUrlsFromHTML(inputHtmlBody, inputBaseUrl)
    const expected = ['https://github.com/fhern103/', 'https://github.com/Felicity05/']

    expect(actual).toEqual(expected)
})

test('get invalid url', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href=fhern103>
                Fidel Hernandez Github page
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://github.com'
    const actual = getUrlsFromHTML(inputHtmlBody, inputBaseUrl)
    const expected = []

    expect(actual).toEqual(expected)
})