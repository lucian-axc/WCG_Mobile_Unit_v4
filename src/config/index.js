import merge from 'lodash.merge'
import prod from './prod.js'
// import testing from './testing.js'
import local from './local.js'

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || 'local'

let envConfig

if (stage === 'production') {
    // envConfig = require('./prod').default // the default is for interoperability between ES5 and ES6 modules
    envConfig = prod
} else if (stage === 'testing') {
    // envConfig = require('./testing').default
    // envconfig = testing
} else {
    // envConfig = require('./local').default
    envConfig = local
}

// The first argument passed as object is the default list of parameters and they get merged
// with the set parameters in envConfig
export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)