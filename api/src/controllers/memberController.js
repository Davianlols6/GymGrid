const model = require("../models/memberModel.js");

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist: ", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length === 0) {
                next();
            } else {
                res.status(409).json({
                    error: "A user with that username or email already exists."
                });
            }
        }
    }

    model.selectMemberByUsernameOrEmail(data, callback);
}

module.exports.register = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || res.locals.hash == undefined) {
        res.status(400).json({
            error: "Username or email or password is undefined"
        });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register: ", error);
            res.status(500).json(error);
        } else {
            res.locals.memberId = results.rows[0].member_id;
            res.locals.message = `User ${data.username} created successfully.`;
            next();
        }
    }

    model.insertSingle(data, callback);
}

module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({
            error: "Username or password is undefined"
        });
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login: ", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: "User not found"
                });
            } else {
                res.locals.hash = results.rows[0].password;
                res.locals.memberId = results.rows[0].member_id;
                next();
            }
        }
    }

    model.selectByUsernameForLogin(data, callback);
}

module.exports.getMemberByAuthToken = (req, res, next) => {
    const data = {
        id: res.locals.memberId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMemberByAuthToken: ", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: "User not found"
                });
            } else {
                res.status(200).json(results.rows[0]);
            }
        }
    }

    model.selectMemberById(data, callback);
}

module.exports.getMemberById = (req, res, next) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            error: "Invalid member_id"
        });
        return;
    }

    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMemberById: ", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: "User not found"
                });
            } else {
                res.status(200).json(results.rows[0]);
            }
        }
    }

    model.selectMemberById(data, callback);
}

module.exports.getMemberByUsername = (req, res, next) => {
    const data = {
        username: req.params.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMemberByUsername: ", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: "User not found"
                });
            } else {
                res.status(200).json(results.rows[0]);
            }
        }
    }

    model.selectMemberByUsername(data, callback);
}

module.exports.updateUsername = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({
            error: "Username is undefined"
        });
        return;
    }

    const data = {
        id: res.locals.memberId,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUsername: ", error);
            res.status(500).json(error);
        } else if (results.rowCount === 0) {
            res.status(404).json({
                error: "User not found"
            });
        } else {
            res.status(200).json(results.rows[0]);
        }
    }

    model.updateUsername(data, callback);
}

module.exports.updateActiveProgramme = (req, res, next) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            error: "Invalid member_id"
        });
        return;
    }

    const data = {
        new_active_programme_id: req.params.id,
        id: res.locals.memberId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateActiveProgramme: ", error);
            res.status(500).json(error);
        } else if (results.rowCount === 0) {
            res.status(404).json({
                error: "User not found"
            });
        } else {
            res.status(200).json(results.rows[0]);
        }
    }

    model.updateActiveProgramme(data, callback);
}