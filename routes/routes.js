// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ fix mongo

const NoteModel = require('../src/models/NoteModel');
const UserModel = require('../src/models/UserModel');

var crypto = require('crypto');
const utils = require('../src/common/utils');
const sessionMiddleware = require('../src/middlewares/session.middleware');
const sessionController = require('../src/controllers/session.controller');
var jwt = require('jsonwebtoken');
const config = require('../src/common/config/env.config');

const router = app => {

    app.post('/auth/login', (request, response) => {

        let { username, password } = request.body
        if (!username || !password) {
            utils.response(response, 300, "param error", null)
        } else {
            UserModel.findUserByUsername(username).then(
                result => {
                    if (result == null) {
                        utils.response(response, 300, "param error", null)
                    } else {
                        console.log(result)
                        if (result.password == password) {
                            let user = {
                                id: result.id,
                                username: result.username,
                                email: result.email,
                                role: result.role,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
                            }
                            var token = jwt.sign(user, config.JWT_SECRET);
                            utils.response(response, 200, "success", {
                                access_token: token
                            })
                        }
                    }
                }
            )
        }
    });

    app.get('/note', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            NoteModel.findAll()
                .then(result => {
                    utils.response(response, 200, "Success", result)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    });

    app.post('/note', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            const uuidv4 = require('uuid/v4');
            request.body.id = uuidv4();
            let user = request.body

            console.log(user)
            // let user = request.body.user
            NoteModel.addNote(user).then(result => {
                //// console.log(result)
                utils.response(response, 200, "Success", null)
            })
        } else {

        }
    });

    app.get('/note/:noteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.noteId) {
                NoteModel.findNoteId(request.params.noteId)
                    .then(result => {
                        //// console.log("result", result)
                        utils.response(response, 200, "Success", result)
                    })
                    .catch(err => {

                    })
            } else {
                utils.response(response, 301, "params error", null)
            }
        } else {

        }
    });

    app.put('/note/:noteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            let note = request.body
            console.log("note", request.params.noteId)
            if (request.params && request.params.noteId) {
                NoteModel.addNoteId(request.params.noteId, note)
                    .then(result => {
                        //// console.log("result", result)
                        utils.response(response, 200, "Success", result)
                    })
                    .catch(err => {

                    })
            } else {
                utils.response(response, 301, "params error", null)
            }
        } else {

        }
    });

    app.delete('/note/:noteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.noteId) {
                NoteModel.DeleteNoteId(request.params.noteId)
                    .then(result => {
                        //// console.log("result", result)
                        utils.response(response, 200, "Success", result)
                    })
                    .catch(err => {

                    })
            } else {
                utils.response(response, 301, "params error", null)
            }
        } else {

        }
    });
}


module.exports = router;