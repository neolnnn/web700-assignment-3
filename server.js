var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

const collegedata = require('./modules/collegeData');
app.use(express.static('views'));

collegedata.initialize().then(() => {
    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/views/home.html`);
    })

    app.get('/about', (req, res) => {
        res.sendFile(`${__dirname}/views/about.html`);
    })

    app.get('/htmldemo', (req, res) => {
        res.sendFile(`${__dirname}/views/htmldemo.html`)
    })

    app.get('/students', (req, res) => {
        var course = req.query.course;

        if (course) {
            collegedata.getStudentsByCourse(course).then((studentlist) => {
                res.send(studentlist);
            }).catch(() => {
                res.json({message: "no results"});
            })
        } else {
            collegedata.getAllStudents().then((studentlist) => {
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
}).then(() => {
    app.listen(HTTP_PORT, () => {console.log(`Server listening on port ${HTTP_PORT}`)});
}).catch((err) => {
    console.error(`Error importing data, server not started: ${err}`)
})