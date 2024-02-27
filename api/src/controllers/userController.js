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
            if (results.length === 0) {
                next();
            } else {
                res.status(409).json({message: "Username or email already exists"})
            }
        }
    }

    model.selectUserByUsernameOrEmail(data, callback);
}