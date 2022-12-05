const handlers = require("./handler");
const router = {
    ping : handlers.ping,
    hello : handlers.hello,
    duck: handlers.duck,
    users: handlers.users
};

module.exports = router;