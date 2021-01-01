// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ fix mongo

const NoteModel = require('../src/models/NoteModel');
const UserModel = require('../src/models/UserModel');
const QuoteModel = require('../src/models/QuoteModel');
const DayEventModel = require('../src/models/DayEventModel');
const LaughStoryModel = require('../src/models/LaughStoryModel');
const TuViHangNgayModel = require('../src/models/TuViHangNgayModel');

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

    app.get('/quote', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            QuoteModel.findAll()
                .then(result => {
                    utils.response(response, 200, "Success", result)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    });

    app.post('/quote', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            const uuidv4 = require('uuid/v4');
            request.body.id = uuidv4();
            let user = request.body

            console.log(user)
            // let user = request.body.user
            QuoteModel.addQuote(user).then(result => {
                //// console.log(result)
                utils.response(response, 200, "Success", null)
            })
        } else {

        }
    });

    app.get('/quote/:quoteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.quoteId) {
                QuoteModel.findQuoteId(request.params.quoteId)
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

    app.put('/quote/:quoteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            let quote = request.body
            console.log("quote", request.params.quoteId)
            if (request.params && request.params.quoteId) {
                QuoteModel.addQuoteId(request.params.quoteId, quote)
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

    app.delete('/quote/:quoteId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.quoteId) {
                QuoteModel.DeleteQuoteId(request.params.quoteId)
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

    app.get('/dayEvent', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            DayEventModel.findAll()
                .then(result => {
                    utils.response(response, 200, "Success", result)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    });

    app.post('/dayEvent', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            const uuidv4 = require('uuid/v4');
            request.body.id = uuidv4();
            let user = request.body

            console.log(user)
            // let user = request.body.user
            DayEventModel.addDayEvent(user).then(result => {
                //// console.log(result)
                utils.response(response, 200, "Success", null)
            })
        } else {

        }
    });

    app.get('/dayEvent/:dayEventId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.dayEventId) {
                DayEventModel.findDayEventId(request.params.dayEventId)
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

    app.put('/dayEvent/:dayEventId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            let dayEvent = request.body
            console.log("dayEvent", request.params.dayEventId)
            if (request.params && request.params.dayEventId) {
                DayEventModel.addDayEventId(request.params.dayEventId, dayEvent)
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

    app.delete('/dayEvent/:dayEventId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.dayEventId) {
                DayEventModel.DeleteDayEventId(request.params.dayEventId)
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

    app.get('/laughStory', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            LaughStoryModel.findAll()
                .then(result => {
                    utils.response(response, 200, "Success", result)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    });

    app.post('/laughStory', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            const uuidv4 = require('uuid/v4');
            request.body.id = uuidv4();
            let user = request.body

            console.log(user)
            // let user = request.body.user
            LaughStoryModel.addLaughStory(user).then(result => {
                //// console.log(result)
                utils.response(response, 200, "Success", null)
            })
        } else {

        }
    });

    app.get('/laughStory/:laughStoryId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.laughStoryId) {
                LaughStoryModel.findLaughStoryId(request.params.laughStoryId)
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

    app.put('/laughStory/:laughStoryId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            let laughStory = request.body
            console.log("laughStory", request.params.laughStoryId)
            if (request.params && request.params.laughStoryId) {
                LaughStoryModel.addLaughStoryId(request.params.laughStoryId, laughStory)
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

    app.delete('/laughStory/:laughStoryId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.laughStoryId) {
                LaughStoryModel.DeleteLaughStoryId(request.params.laughStoryId)
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

    app.get('/tuViHangNgay', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            TuViHangNgayModel.findAll()
                .then(result => {
                    utils.response(response, 200, "Success", result)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    });

    app.post('/tuViHangNgay', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            const uuidv4 = require('uuid/v4');
            request.body.id = uuidv4();
            let user = request.body

            console.log(user)
            // let user = request.body.user
            TuViHangNgayModel.addTuViHangNgay(user).then(result => {
                //// console.log(result)
                utils.response(response, 200, "Success", null)
            })
        } else {

        }
    });

    app.get('/tuViHangNgay/:tuViHangNgayId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.tuViHangNgayId) {
                TuViHangNgayModel.findTuViHangNgayId(request.params.tuViHangNgayId)
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

    app.put('/tuViHangNgay/:tuViHangNgayId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            let tuViHangNgay = request.body
            console.log("tuViHangNgay", request.params.tuViHangNgayId)
            if (request.params && request.params.tuViHangNgayId) {
                TuViHangNgayModel.addTuViHangNgayId(request.params.tuViHangNgayId, tuViHangNgay)
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

    app.delete('/tuViHangNgay/:tuViHangNgayId', (request, response) => {
        const { access_token } = request.headers

        if (utils.token_required(2048, access_token)) {
            if (request.params && request.params.tuViHangNgayId) {
                TuViHangNgayModel.DeleteTuViHangNgayId(request.params.tuViHangNgayId)
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