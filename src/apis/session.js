
import utils from "../common/utils"



exports.login = (req, res) => {
    
    UserModel.findById(req.params.userId)
        .then((result) => {
            utils.response(res, 200, "Success", result);
        })
        .catch(err => {
            console.log(err);
            utils.response(res, 500, "Something went wrong");
        });
};