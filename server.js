/********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
*  of this assignment has been copied manually or electronically from any other source
*  (including 3rd party web sites) or distributed to other students.
*
*  Name: Nate Joshua Student ID: njoshua2 Date: 2/15/2024
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

const collegedata = require('./modules/collegeData'); // imports the collegedata module
app.use(express.static('views'));

collegedata.initialize().then(() => { // initializes collegedata before starting the server
    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/views/home.html`); // uses an html file for the home page
    })

    app.get('/about', (req, res) => {
        res.sendFile(`${__dirname}/views/about.html`);
    })

    app.get('/htmldemo', (req, res) => {
        res.sendFile(`${__dirname}/views/htmldemo.html`);
    })

    app.get('/students', (req, res) => {
        var course = req.query.course;

        if (course) {
            collegedata.getStudentsByCourse(course).then((studentlist) => { // calls this function if there is a query
                res.send(studentlist);
            }).catch(() => {
                res.json({message: "no results"});
            })
        } else {
            collegedata.getAllStudents().then((studentlist) => { // otherwise calls this function
                res.send(studentlist);
            }).catch(() => {
                res.json({message: "no results"});
            })
        }
    })

    app.get('/tas', (req, res) => {
        collegedata.getTAs().then((talist) => {
            res.send(talist);
        }).catch(() => {
            res.json({message: "no results"});
        })
    })

    app.get('/courses', (req, res) => {
        collegedata.getCourses().then((courselist) => {
            res.send(courselist);
        }).catch(() => {
            res.json({message: "no results"});
        })
    })

    app.get('/student/:num', (req, res) => {
        var num = req.params.num;

        collegedata.getStudentByNum(num).then((student) => {
            res.send(student);
        }).catch(() => {
            res.json({message: "no results"});
        })
    })

    app.use((req, res) => { // shows a 404 page if an invalid page is entered
        res.status(404).sendFile(`${__dirname}/views/errorpage.html`);
    })
}).then(() => {
    app.listen(HTTP_PORT, () => {console.log(`Server listening on port ${HTTP_PORT}`)}); // starts the server
}).catch((err) => {
    console.error(`Error importing data, server not started: ${err}`);
})