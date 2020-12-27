
let config = {
    "port": 20198,
    "mongodbUri": "mongodb://ccbroot:CcbRoot2017@10.40.80.68:15001/thatcaredb2?authSource=admin",
    // "mongodbUri": "mongodb://root:root123456@10.40.80.68:31000/vngiq_dev?authSource=admin&replicaSet=rs_facecheckin",
    "environment": "dev",
    "login_callback_url": `https://api.vngiq.grdai.vn/api/login-callback`,
    "login_redirect_url": "https://vngiq.grdai.vn", // URL redirect after login success
    "JWT_SECRET" : "thatcaredathv"

};

module.exports = config;