const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// configuration for database connection
const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'TankpreiseDB',
    multipleStatements: true
});

// inject middleware services
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// creates session by user login action
app.get('/api/access', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const sessionKey = (Math.random() + 1).toString(36); // generate random session key

    const selectSql = "SELECT user_id FROM user WHERE (user_name = ? AND user_password = ?);";
    const insertSql = "INSERT INTO session (session_key, session_user_id) VALUES (?,?);";

    db.query(selectSql, [username, password], (errorSelect, resultSelect) => {
        if (resultSelect[0] != undefined && resultSelect[0].user_id != "") {
            db.query(insertSql, [sessionKey, resultSelect[0].user_id], (errorInsert, resultInsert) => {
                res.send(sessionKey);
            });
        } else {
            res.send("");
        }
    });
})

// creates new user by register action
app.post('/api/user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const sessionKey = (Math.random() + 1).toString(36); // generate random session key
    
    const createUserSql = "INSERT INTO user (user_name, user_password) VALUES (?,?); SELECT user_id FROM user WHERE (user_name = ? AND user_password = ?);";
    const insertSqlSession = "INSERT INTO session (session_key, session_user_id) VALUES (?,?);";
    
    db.query(createUserSql, [username, password, username, password], (errorCreate, resultCreate) => {
        if (resultCreate[1][0] != undefined && resultCreate[1][0].user_id != "") {
            db.query(insertSqlSession, [sessionKey, resultCreate[1][0].user_id], () => {
                res.send(sessionKey);
            });
        }
    });
});

// validates given session key
app.get('/api/checksessionkey', (req, res) => {
    const sessionKey = req.query.sessionKey;
    const selectSqlSession = "SELECT session_id FROM session WHERE session_key = ?;";

    db.query(selectSqlSession, [sessionKey], (error, result) => {
        res.send(result[0] != undefined && result[0].session_id != "");
    });
});

// deletes existing session key by signout action
app.delete('/api/deletesessionkey', (req, res) => {
    const sessionKey = req.body.sessionKey;
    const deleteSql = "DELETE FROM session WHERE session_key = ?;";

    db.query(deleteSql, [sessionKey], (err, result) => {
        res.send(true);
    });
});

// checks if given gasStationId is bookmarked
app.get('/api/checkbookmark', (req, res) => {
    const sessionKey = req.query.sessionKey;
    const gasStationId = req.query.gsId;

    const selectSqlSession = "SELECT session_user_id FROM session WHERE session_key = ?;";
    const selectSqlFavorite = "SELECT fav_id FROM favorite WHERE (fav_user_id = ? AND fav_gs_id = ?);";

    db.query(selectSqlSession, [sessionKey], (err1, result1) => {
        if (result1[0] != undefined && result1[0].session_user_id != "") {
            db.query(selectSqlFavorite, [result1[0].session_user_id, gasStationId], (err2, result2) => {
                res.send(result2[0] != undefined && result2[0].fav_id != "");
            });
        } else {
            res.status(500).send("Es ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.");
        }
    });
});

// creates new user bookmark to gasStationId
app.post('/api/favorite', (req, res) => {
    const sessionKey = req.body.sessionKey;
    const gasStationId = req.body.gsId;
    
    const selectSqlSession = "SELECT session_user_id FROM session WHERE session_key = ?;";
    const insertSqlFavorite = "INSERT INTO favorite (fav_user_id, fav_gs_id) VALUES (?,?);";
    
    db.query(selectSqlSession, [sessionKey], (err1, result1) => {
        if (result1[0] != undefined && result1[0].session_user_id != "") {
            db.query(insertSqlFavorite, [result1[0].session_user_id, gasStationId], (err2, result2) => {
                res.send(result2.insertId != null && result2.insertId != 0);
            });
        } else {
            res.status(500).send("Es ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.");
        }
    });
});


// deletes existing user bookmark for gasStationId
app.delete('/api/deletefavorite', (req, res) => {
    const sessionKey = req.body.sessionKey;
    const gasStationId = req.body.gsId;

    const selectSqlSession = "SELECT session_user_id FROM session WHERE session_key = ?;";
    const deleteSqlFavorite = "DELETE FROM favorite WHERE (fav_user_id = ? AND fav_gs_id = ?);";

    db.query(selectSqlSession, [sessionKey], (err1, result1) => {
        if (result1[0] != undefined && result1[0].session_user_id != "") {
            db.query(deleteSqlFavorite, [result1[0].session_user_id, gasStationId], (err2, result2) => {
                res.send(true);
            });
        } else {
            res.status(500).send("Es ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.");
        }
    });
});

// gets all user bookmarks
app.get('/api/bookmark', (req, res) => {
    const sessionKey = req.query.sessionKey;

    const selectSqlSession = "SELECT session_user_id FROM session WHERE session_key = ?;";
    const selectSqlFavorite = "SELECT fav_gs_id FROM favorite WHERE fav_user_id = ?;";

    db.query(selectSqlSession, [sessionKey], (err1, result1) => {
        if (result1[0] != undefined && result1[0].session_user_id != "") {
            db.query(selectSqlFavorite, [result1[0].session_user_id], (err2, result2) => {
                res.send(result2);
            });
        } else {
            res.status(500).send("Es ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.");
        }
    });
});

// server listening
app.listen(3001, () => {
    console.log('server running on port 3001');
});