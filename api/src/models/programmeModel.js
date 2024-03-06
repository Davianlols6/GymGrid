const pool = require('../services/db');

module.exports.selectAllProgrammes = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT programme_id, name, member_id FROM programme
        WHERE member_id = '${data.id}';
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.insertProgramme = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO programme (name, member_id)
        VALUES ('${data.name}', '${data.id}')
        RETURNING programme_id, name, member_id;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectProgrammeByName = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT name FROM programme
        WHERE name = '${data.name}';
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.updateProgramme = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE programme
        SET name = '${data.name}'
        WHERE programme_id = '${data.id}'
        RETURNING programme_id, name, member_id;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.deleteProgramme = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM programme
        WHERE programme_id = '${data.id}';
    `;

    pool.query(SQLSTATEMENT, callback);
}