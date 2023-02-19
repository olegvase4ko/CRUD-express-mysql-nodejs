const mysql = require("mysql2");
const express = require("express");

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "ARTEZIO_STAFF",
    password: "62830"
});

app.set("view engine", "hbs");

app.get("/", function (req, res) {
    pool.query("SELECT * FROM staff", function (err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            users: data
        });
    });
});

app.get("/create", function (req, res) {
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) {
    if (!req.body) return res.status(404);
    const name = req.body.name;
    const tecnology = req.body.tecnology;
    const position = req.body.position;
    const employed = req.body.employed;
    pool.query("INSERT INTO staff(staff_name,staff_tecnology,staff_position,staff_employed) VALUES (?,?,?,?)", [name, tecnology, position, employed], function (err, data) {
        if (err) return console.log(err);
        res.redirect('/');
    });
});

app.get("/edit/:id", function (req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM staff WHERE staff_id=?", [id], function (err, data) {
        if (err) return console, log(err);
        res.render("edit.hbs", {
            user: data[0]
        });
    });
});

app.post("/edit", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const tecnology = req.body.tecnology;
    const position = req.body.position;
    const employed = req.body.employed;
    const id = req.body.id;

    pool.query("UPDATE staff SET staff_name=?,staff_tecnology=?,staff_position=?,staff_employed=? WHERE staff_id=?", [name, tecnology, position, employed, id], function (err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

app.post("/delete/:id", function (req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM staff WHERE staff_id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

app.listen(3000, function () {
    console.log("Server ----started");
});