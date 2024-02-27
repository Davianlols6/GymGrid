const pool = require('../services/db');

const SQLSTATEMENT = `
    SELECT table_name 
    FROM information_schema.tables
    WHERE table_schema = 'neggardevelopment'
    ORDER BY table_name;
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error: ", error);
    } else {
        console.log("Results: ", results.rows);
    }
    process.exit();
});
