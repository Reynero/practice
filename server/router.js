const handlers = require("../endpoints/handler");
const router = {
    ping : handlers.ping,
    hello : handlers.hello,
    duck: handlers.duck,
    users: handlers.users,
    person: handlers.person,
    products: handlers.products,
    purchases: handlers.purchases
};

module.exports = router;