// Dependencies
const handlers = require( './handlers.js' );

// Container for the module (to be exported)
const router = {
    ping : handlers.ping,
    hello : handlers.hello,
    users : handlers.users,
    products : handlers.products,
    purchases : handlers.purchases,
    staff: handlers.staff,
    branches: handlers.branches,
    duck: handlers.duck
};

// Export the module
module.exports = router;