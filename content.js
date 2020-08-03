const brandName = 'b1b'
const TIMEOUT_POPUP = 350

const svgIcon = '<svg viewBox="0 -1 15 17.5" class="gs_or_svg"><path d="M6.4,1.4C6.4,1.9,6.1,2.3,5.8,2.8C5.3,3.4,4.9,4,4.9,4.8c0,0.7,0.3,1.2,0.7,1.7c0.5,0.5,1.1,0.7,1.7,0.7 c0.7,0,1.3-0.2,1.7-0.7c0.4-0.4,0.7-1,0.7-1.7c0-0.8-0.4-1.4-0.9-2C8.5,2.3,8.2,1.9,8.1,1.4c-0.1-0.5,0-0.9,0.4-1.2 C9.1-0.2,9.8,0,10.3,0.3c0.5,0.3,1.1,0.9,1.6,1.7c0.4,0.6,0.8,1.4,1.2,2.4c0.8,2.1,1.3,3.9,1.3,5.5c0,1.3-0.3,2.4-0.8,3.3 c-0.6,0.9-1.4,1.6-2.6,2.1C10,15.8,8.8,16,7.3,16c-1.5,0-2.7-0.2-3.7-0.6c-1.2-0.5-2-1.2-2.6-2.1c-0.6-0.9-0.8-2-0.8-3.3 c0-1.6,0.4-3.5,1.3-5.5c0.4-1,0.8-1.7,1.2-2.4c0.6-0.9,1.1-1.4,1.6-1.7C4.8,0,5.5-0.2,6,0.2C6.4,0.5,6.5,0.9,6.4,1.4z M7.3,7.7 c-0.8,0-1.5-0.3-2.1-0.9c-0.5-0.5-0.8-1.2-0.8-2c0-1,0.4-1.5,1-2.3C5.6,2.1,5.9,1.7,6,1.4c0-0.3,0-0.6-0.2-0.8 C5.4,0.4,4.9,0.5,4.6,0.7C4.1,1,3.6,1.5,3.1,2.3C2.7,2.9,2.3,3.7,1.9,4.6c-0.8,2-1.2,3.8-1.2,5.4c0,1.2,0.2,2.2,0.8,3.1 c0.5,0.8,1.3,1.5,2.3,1.9c1,0.4,2.1,0.6,3.5,0.6s2.6-0.2,3.5-0.6c1-0.4,1.8-1.1,2.3-1.9c0.5-0.8,0.8-1.9,0.8-3.1 c0-1.5-0.4-3.4-1.2-5.4c-0.4-0.9-0.8-1.7-1.2-2.3C11,1.5,10.5,1,10,0.7C9.7,0.5,9.2,0.4,8.9,0.6C8.6,0.8,8.6,1.1,8.6,1.4 c0.1,0.4,0.3,0.7,0.6,1.1c0.6,0.8,0.9,1.3,1,2.3c0,0.8-0.3,1.5-0.8,2C8.8,7.4,8.1,7.7,7.3,7.7z"/></svg>'

let createSnackbar = () => {
    let divSnackbar = document.createElement('div')
    divSnackbar.id = 'snackbar'
    return divSnackbar
}

let showSnackbar = () => {
    let divSnackbar = document.getElementById("snackbar");
    divSnackbar.innerHTML = "BibTex copied to clipboard!"
    divSnackbar.className = "show";
    setTimeout(() => { divSnackbar.className = divSnackbar.className.replace("show", ""); }, 3000);
}

let getParamFromUrl = (keyword) => {
    const queryString = location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(keyword)
}

let setParamInUrl = (keyword, value) => {
    const queryString = location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.set(keyword, value);
    return location.pathname + '?' + urlParams
}

// keep track of window scrolling
let dy = 0
window.onscroll = () => {
    dy = window.scrollY == 0 ? dy : window.scrollY
};


let url = location.href.toString()
// if this is a bibtext page
if (url.includes('scholar.googleusercontent.com') && getParamFromUrl(brandName) == 1) {
    let strBib = document.getElementsByTagName('pre')[0].innerHTML
    try {
        navigator.clipboard.writeText(strBib)
    } catch (err) {
        console.error('Failed to copy!', err)
    }
    history.back()

}
// if this is a scholar search results page
else if (location.href.includes('scholar.google.com')) {
    document.body.appendChild(createSnackbar())

    history.scrollRestoration = 'auto'

    // returning from the bibtex page
    if (getParamFromUrl(brandName) == 1) {

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
            window.scrollTo(0, getParamFromUrl('perc'))
        }

        setTimeout(() => {
            showSnackbar()
            window.scrollTo(0, getParamFromUrl('perc'))
        }, 250);

        // clear the flag
        history.replaceState({ info: brandName + ' state' }, document.title, setParamInUrl(brandName, 0))
    }

    // add bibs to each search result
    let divLinks = document.getElementsByClassName('gs_fl')
    Array.from(divLinks).forEach(divElm => {
        if (divElm.className == 'gs_fl') {
            let aBib = document.createElement('a')
            aBib.href = 'javascript:void(0)'
            aBib.innerHTML = svgIcon
            //
            // event handler of each bib button
            // 
            aBib.addEventListener('click', () => {
                let siblings = aBib.parentElement.children
                Array.from(siblings).forEach(elm => {
                    if (elm.className == 'gs_or_cit gs_nph') {
                        elm.click()
                        setTimeout(() => {
                            aCitations = document.getElementsByClassName('gs_citi')
                            Array.from(aCitations).forEach(elm => {
                                // locate the bibtex link
                                if (elm.href.includes('scholar.bib')) {
                                    // add the bib and scroll perc param to url for passing info between pages
                                    const queryString = location.search
                                    const urlParams = new URLSearchParams(queryString)
                                    urlParams.set(brandName, 1);
                                    urlParams.set('perc', dy);
                                    history.replaceState({ info: brandName + ' state', scrollTop: dy }, document.title, location.pathname + '?' + urlParams)

                                    location.href = elm.href + '&' + brandName + '=1'

                                }
                            })
                        }, TIMEOUT_POPUP);

                        return
                    }
                })
            })
            divElm.appendChild(aBib)
        }
    })
}