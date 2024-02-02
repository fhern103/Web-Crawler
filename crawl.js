const {JSDOM} = require('jsdom')


async function crawlPage(currentPage) {
    try {
        const res = await fetch(currentPage)

        if (res.status > 399) {
            console.log(`Error fetching page: ${currentPage}, status code: ${res.status}`)
            return
        }

        const contentType = res.headers.get('content-type')

        if (!contentType.includes('text/html')) {
            console.log(`Invalid content type: ${contentType}, on page: ${currentPage}`)
            return
        }

        console.log(await res.text())
    } catch (err) {
        console.log(`Error in fetch: ${err.message} on page: ${currentPage}`)
    }
    
}

function getUrlsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for ( const link of linkElements) {
        // Relative url
        if (link.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                consolelog(`Error with relative url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Error with absolute url: ${err.message}`)
            }
        }
    }

    return urls
}

function normalizeUrl(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML,
    crawlPage
}