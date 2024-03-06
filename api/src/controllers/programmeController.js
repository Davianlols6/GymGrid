const model = require("../models/programmeModel.js");

module.exports.getAllProgrammesByAuthToken = (req, res, next) => {
    const data = {
        id: res.locals.memberId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllProgrammesByAuthToken: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results.rows);
        }
    }

    model.selectAllProgrammes(data, callback);
}

module.exports.checkProgrammeNameExists = (req, res, next) => {
    const data = {
        name: req.body.name,
        id: res.locals.memberId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkProgrammeNameExists: ', error);
            res.status(500).json(error);
        } else {
            if (results.rows.length != 0) {
                res.status(409).json({
                    error: 'Programme name already exists'
                });
            } else {
                next();
            }
        }
    }

    model.selectProgrammeByName(data, callback);
}

module.exports.createProgramme = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).json({
            error: 'Name is missing'
        });
        return;
    }

    const data = {
        name: req.body.name,
        id: res.locals.memberId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createProgramme: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results.rows[0]);
        }
    }

    model.insertProgramme(data, callback);
}

module.exports.updateProgrammeById = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).json({
            error: 'Name is missing'
        });
        return;
    }

    const data = {
        name: req.body.name,
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateProgrammeById: ', error);
            res.status(500).json(error);
        } else if (results.rowCount == 0) {
            res.status(404).json({
                error: 'Programme not found'
            });
        } else {
            res.status(200).json(results.rows[0]);
        }
    }

    model.updateProgramme(data, callback);
}

module.exports.deleteProgrammeById = (req, res, next) => {
    const data = {
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteProgrammeById: ', error);
            res.status(500).json(error);
        } else if (results.rowCount == 0) {
            res.status(404).json({
                error: 'Programme not found'
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteProgramme(data, callback);
}