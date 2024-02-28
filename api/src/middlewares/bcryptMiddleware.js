const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.comparePassword = (req, res, next) => {
    const callback = (err, isMatch) => {
        if (err) {
            console.error("Error bcrypt:", err);
            res.status(500).json(err);
        } else {
            if (isMatch) {
                next();
            } else {
                res.status(401).json({
                    error: "Wrong password",
                });
            }
        }
    };

    bcrypt.compare(req.body.password, res.locals.hash, callback);
};

module.exports.hashPassword = (req, res, next) => {
    if (req.body.password === undefined) {
        res.status(400).json({
            error: "Password is not defined"
        });
        return;
    }

    const callback = (err, hash) => {
        if (err) {
            console.error("Error bcrypt:", err);
            res.status(500).json(err);
        } else {
            res.locals.hash = hash;
            next();
        }
    };
  
    bcrypt.hash(req.body.password, saltRounds, callback);
};
