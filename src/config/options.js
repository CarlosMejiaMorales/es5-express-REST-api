module.exports = {
    launch: {
        port: process.env.PORT || 9000, // port configuration
        hostname: 'localhost', // hostname configuration
        staticFiles: '/public' // static files configuration **if noon provided use /public
    },
    dataBaseConnecton: {
        uri: 'mongodb://localhost/custom', // database location if !db?creates(db):connects to it 
        options: {
            useMongoClient: true,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0
        }
    },
    /*routers: {
        mainRouter: '/home',
        router2: '/home/auth',
        router3: '/home/login'
    }*/
}