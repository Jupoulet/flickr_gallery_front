
const getUrlImage = (url, screenSize) => {

    screenSize = {
        xs: 'm',
        sm: 'n',
        md: 'z',
        lg: 'c'
    }[screenSize] || screenSize

    return url.replace(/\.png/, `_${screenSize}.png`)

}

export { getUrlImage }