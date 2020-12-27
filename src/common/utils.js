const uuid = require('uuid/v4');
var jwt = require('jsonwebtoken');
const config = require('../common/config/env.config');

exports.replaceAll = function(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

exports.uuid = function () {
    let tid = uuid();
    return this.replaceAll(tid, '-', '');
}

exports.randint = function (max, min=0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.genAPIKey = function () {
    let uuid = this.uuid();
    let key = "";
    for (let i = 0; i < uuid.length; i++) {
        if (this.randint(10) > 5) {
            key += uuid[i].toUpperCase();
        } else {
            key += uuid[i];
        }
    }
    return key;
}

exports.response = function (res, code, message, data=null) {
    if (data) {
        res.status(200).send({data, error: {code, message}});
    } else {
        res.status(200).send({error: {code, message}});
    }
}

exports.token_required = function (minimum_permission, token) {
   let data = jwt.decode(token)
  // console.log(data)
   let {role, exp} = data
//    if (exp) {
       
//    }
   return true

}