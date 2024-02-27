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

module.exports.selectMemberByAuthToken = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT member_id, username, email, active_programme_id FROM member
        WHERE member_id = ${data.member_id};
    `;

    pool.query(SQLSTATEMENT, callback);
}