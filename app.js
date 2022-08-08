const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/

//use express static folder
app.use(express.static("./public"));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
var urlencodedParser = express.urlencoded({ extended: false });

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'elpdev', /* MySQL User */
    password: 'elphill123', /* MySQL Password */
    database: 'node_restapi' /* MySQL Database */
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server...');
});

//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/users', (req, res) => {
    let sqlQuery = "SELECT * FROM users";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Create New User
 *
 * @return response()
 */
app.post('/', urlencodedParser, upload.single('image'), (req, res) => {
    console.log(req.body);
    let data = { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email };

    let sqlQuery = "INSERT INTO users SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
    // if (!req.file) {
    //     console.log("No file upload");
    // } else {
    //     console.log(req.file.filename)
    //     var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
    //     var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
    //     db.query(insertData, [imgsrc], (err, result) => {
    //         if (err) throw err
    //         console.log("file uploaded")
    //     })
    // }
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/items', (req, res) => {
    let sqlQuery = "SELECT * FROM items";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/items/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/items', (req, res) => {
    let data = { title: req.body.title, body: req.body.body };

    let sqlQuery = "INSERT INTO items SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/items/:id', (req, res) => {
    let sqlQuery = "UPDATE items SET title='" + req.body.title + "', body='" + req.body.body + "' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/items/:id', (req, res) => {
    let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
