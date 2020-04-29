const endpoints = {
    development: {
        BASE_URL: "http://localhost:3000",
        BASE_API: "http://localhost:4000"
    },
    production: {
        BASE_URL: "82.123.105.222:3100",
        BASE_API: "82.123.105.222:4100"
    }
}[process.env.NODE_ENV]

export default endpoints