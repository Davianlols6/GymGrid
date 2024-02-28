const pool = require('../services/db');

const SQLSTATEMENT = `

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error: ", error);
    } else {
        console.log("Results: ", results.rows);
    }
    process.exit();
});
