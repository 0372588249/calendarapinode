let config = {
    "port": 20198,
    "mongodbUri": "mongodb://127.0.0.1:27017/calendar",
    "environment": "dev",
    "login_callback_url": `http://localhost:20198/api/login-callback`,
    "login_redirect_url": "http://localhost:3000", // URL redirect after login success
};

module.exports = config;
