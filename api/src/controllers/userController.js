const model = require("../models/userModel.js");

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.rows.length === 0) {
                next();
            } else {
                res.status(409).json({message: "Username or email already exists"})
            }
        }
    }

    model.selectUserByUsernameOrEmail(data, callback);
}

// CONTROLLER FOR REGISTER
module.exports.register = (req, res, next) => {

    if(req.body.username == undefined || req.body.email == undefined || res.locals.hash == undefined)
    {
        res.status(400).send("Error: username or email or password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } 
        else {
            res.locals.memberId = results.rows[0].member_id;
            res.locals.message = `User ${data.username} created successfully.`;
            next();
        }
    }

    model.insertSingle(data, callback);
}

// CONTROLLER FOR LOGIN
module.exports.login = (req, res, next) => {

    if(req.body.username == undefined || req.body.password == undefined)
    {
        res.status(400).send("Error: username or password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.rows.length === 0) {
                res.status(404).json({message: "User not found"})
            } else {
                res.locals.hash = results.rows[0].password;
                res.locals.userId = results.rows[0].member_id;
                next();
            }
        }
    }

    model.selectByUsernameForLogin(data, callback);
}