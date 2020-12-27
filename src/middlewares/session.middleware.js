const utils = require('../common/utils');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.createAccountVerifyData = (req, res, next) =>{
    let userinfo = req.body.userinfo
    
    if(userinfo == null || !validateEmail(userinfo.username) || userinfo.password == ""){
        return utils.response(res, 300, "data error",null)
    } else {
        return next();
    }
}