const pool = require('../services/db');

module.exports.selectUserByUsernameOrEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT username, email FROM User
        WHERE username = ${data.username} OR email = ${data.email};
    `;

    pool.query(SQLSTATEMENT, callback);
}
