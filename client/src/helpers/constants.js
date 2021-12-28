const prod = {
    url: {
        API_URL: 'https://prnts-music-nfts.herokuapp.com'
    }
}

const dev = {
    url: {
        API_URL: 'http://localhost:8080'
    }
}

const config = process.env.NODE_ENV === 'development' ? dev : prod

export default config
