const pool = require('../services/db');

module.exports.selectUserByUsernameOrEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT username, email FROM member
        WHERE username = '${data.username}' OR email = '${data.email}';
    `;

    pool.query(SQLSTATEMENT, callback);
}

// Inserts single row into mysql
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO member (username, email, password)
        VALUES ('${data.username}', '${data.email}', '${data.password}')
        RETURNING member_id, username, email;
    `;

    pool.query(SQLSTATMENT, callback);
}

// Selects rows by provided username
module.exports.selectByUsernameForLogin = (data, callback) => {
    const SQLSTATMENT = `
        SELECT member_id, password FROM member WHERE username = '${data.username}';
    `;

    pool.query(SQLSTATMENT, callback);
}