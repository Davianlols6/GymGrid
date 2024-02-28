const pool = require('../services/db');

const SQLSTATEMENT = `

SELECT member_id, username, email, active_programme_id FROM member
WHERE username = 'test4';

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error: ", error);
    } else {
        console.log("Results: ", results.rows);
    }
    process.exit();
});
