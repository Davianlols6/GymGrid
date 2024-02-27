const pool = require('../services/db');

const SQLSTATEMENT = `

SELECT username, email FROM member
WHERE username = 'John Doe' OR email = 'a@dabc.com';

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error: ", error);
    } else {
        console.log("Results: ", results.rows);
    }
    process.exit();
});
