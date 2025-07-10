const endpoints = {
    development: {
        BASE_URL: "http://localhost:3000",
        BASE_API: "https://flickr-gallery-api.herokuapp.com" //"http://192.168.1.10:4100"
    },
    production: {
        BASE_URL: "https://olivier-picard.com",
        BASE_API: "https://api.olivier-picard.com" //"https://flickr-gallery-api.herokuapp.com"
    }
}[process.env.NODE_ENV]

export default endpoints