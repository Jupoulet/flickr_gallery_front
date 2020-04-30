const endpoints = {
    development: {
        BASE_URL: "http://localhost:3000",
        BASE_API: "http://localhost:4000"
    },
    production: {
        BASE_URL: "https://olivier-picard.com",
        BASE_API: "https://api.olivier-picard.com"
    }
}[process.env.NODE_ENV]

export default endpoints