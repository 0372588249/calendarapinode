const SessionModel = require('../models/beenloveapp/SessionModel')
const utils = require('../common/utils');
exports.createUser = (req, res) => {
    // name: String,
    // username:String,
    // password: String,
    // phone:String,
    // verifycode:String,
    // status:Number

    let user = req.body.userinfo;
    if (user.name == null || user.name == undefined) {
        user.name = ''
    }
    if (user.phone == null || user.phone == undefined) {
        user.phone = ''
    }
    user.verifycode = 'adxc'
    user.status = 0

    SessionModel.addNewUser(user).then(result => {
        //console.log(result)
        if (result.result.ok == 1) {
            utils.response(res, 200, "Success",result.ops)

        } else {
            utils.response(res, 301, "Lỗi ngoại lệ",null)
        }
    }).catch(err =>{
        utils.response(res, 301, "Lỗi ngoại lệ",null)
    })

}