const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Railway inserisce automaticamente queste variabili
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

app.use(express.text()); 

app.post('/upload', (req, res) => {
    const chatData = req.body;
    
    if (!chatData) return res.status(400).send("No data");

    // NOTA: devi aver creato una tabella chiamata 'chat_table' nel DB
    const sql = "UPDATE chat_table SET content = ? WHERE id = 1";
    db.query(sql, [chatData], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("ERROR_SAVE");
        }
        res.send("OK");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
