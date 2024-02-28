const pool = require('../services/db');

module.exports.selectMemberByUsernameOrEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT username, email FROM member
        WHERE username = '${data.username}' OR email = '${data.email}';
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO member (username, email, password)
        VALUES ('${data.username}', '${data.email}', '${data.password}')
        RETURNING member_id, username, email;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectByUsernameForLogin = (data, callback) => {
    const SQLSTATMENT = `
        SELECT member_id, password FROM member WHERE username = '${data.username}';
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectMemberById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT member_id, username, email, active_programme_id FROM member
        WHERE member_id = ${data.id};
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectMemberByUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT member_id, username, email, active_programme_id FROM member
        WHERE username = '${data.username}';
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.updateUsername = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE member
        SET username = '${data.username}'
        WHERE member_id = ${data.id}
        RETURNING username;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.updateActiveProgramme = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE member
        SET active_programme_id = ${data.new_active_programme_id}
        WHERE member_id = ${data.id}
        RETURNING active_programme_id;
    `;

    pool.query(SQLSTATEMENT, callback);
}
