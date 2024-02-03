import * as dotenv from 'dotenv'
dotenv.config() // loads all environment variables from .env file that have not been uploaded,
                // into the server. We do it in index.ts because it is the entry point into our server
import config from './config/index.js'

import app from './server.js'

// For catching errors that happen
// at the level of Node and not in Express
process.on('uncaughtException', () => {
    console.log('Uncaught Exception')
})

//for uncaught rejected Promises, (async errors)
process.on('unhandledRejection', () => {
    console.log('Unhandled Rejection')
})


app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`)
})
