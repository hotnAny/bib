const brandName = 'b1b'

const svgIcon = ''

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

let url = location.href.toString()
if (url.includes('scholar.googleusercontent.com') && getParamFromUrl(brandName) == 1) {
    let strBib = document.getElementsByTagName('pre')[0].innerHTML
    try {
        navigator.clipboard.writeText(strBib)
    } catch (err) {
        console.error('Failed to copy!', err)
    }
    history.back()
    
} else if (location.href.includes('scholar.google.com')) {
    if (getParamFromUrl(brandName) == 1) {
        setTimeout(() => {
            try {
                document.getElementById('gs_cit-x').click()
            } catch (err) {

            }
        }, 100);
    }

    let divLinks = document.getElementsByClassName('gs_fl')

    Array.from(divLinks).forEach(divElm => {
        if (divElm.className == 'gs_fl') {
            let aBib = document.createElement('a')
            aBib.href = 'javascript:void(0)'
            aBib.innerHTML = '<svg viewBox="0 0 15 16" class="gs_or_svg"><path d="M8.8,4.8H4.4C3.6,4.8,3,4.3,2.9,3.7c0-0.3,0.1-0.6,0.4-0.8c0.3-0.2,0.6-0.4,1-0.4h0.1c0.6,0,1.2-0.5,1.2-1V1.1	c0-0.6-0.5-1-1.2-1H3.4c-2.2,0-3.9,1.5-3.9,3.4v5.7c0,3.3,3.1,6,7,6s7-2.7,7-6V3.5c0-1.8-1.8-3.4-3.9-3.4H8.7c-0.6,0-1.2,0.5-1.2,1	v0.4c0,0.6,0.5,1,1.2,1c0.8,0,1.4,0.5,1.5,1.2c0,0.3-0.1,0.6-0.4,0.8C9.5,4.7,9.1,4.8,8.8,4.8z"/></svg>'
            aBib.addEventListener('click', () => {
                let siblings = aBib.parentElement.children
                Array.from(siblings).forEach(elm => {
                    if (elm.className == 'gs_or_cit gs_nph') {
                        elm.click()
                        setTimeout(() => {
                            aCitations = document.getElementsByClassName('gs_citi')
                            Array.from(aCitations).forEach(elm => {
                                if (elm.href.includes('scholar.bib')) {
                                    history.replaceState({info: brandName + ' state'}, document.title, setParamInUrl(brandName, 1))
                                    location.href = elm.href + '&' + brandName + '=1'
                                }
                            })
                        }, 150);

                        return
                    }
                })
            })
            divElm.appendChild(aBib)
        }
    })
}

{/* <svg viewBox="-1 0 17 16" class="gs_or_svg"><path d="M1.5 3.5v5h2v.375L1.75 12.5h3L6.5 8.875V3.5zM9.5 3.5v5h2v.375L9.75 12.5h3L14.5 8.875V3.5z"></path></svg> */}