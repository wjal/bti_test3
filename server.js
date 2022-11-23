// Name:  James Little
// Student Number: 028496123
//I acknowledge the College's academic integrity policy - and my own integrity - remain in effect when work is done remotely or onsite.  
//Any test or assignment is an act of trust between me and my prfessor and especially my classmates... even when no one is watching. 
// I declare i will not break that trust.


// Cyclic URL: 

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const path =  require ('path');
const fs = require('fs');
const res = require('express/lib/response');
const req = require("express/lib/request");
//const multer = require('multer');
const moduleB = require('./test2_moduleB.js');
const { timeStamp } = require("console");
const { isContext } = require("vm");




app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        mainLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') + '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        }
    }
})
)
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

on_http = () =>{
    console.log(`listening on ` + HTTP_PORT);
}

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

//const upload = multer({ storage: storage });


moduleB.prepare('students.json').then(app.listen(HTTP_PORT, on_http));



app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/bsd', (req, res)=>{
        res.render('student', )
    }
)



app.get("/allStudents", (req, res)=>{
    moduleB.prepare('students.json').then(students=>{
        res.render('students', {students: students })
    });
    }
);

app.get("/bsdStudents", (req, res)=>{
    moduleB.prepare('students.json').then(moduleB.getBSD).then(bsd=>{
        res.render('students', {students: bsd})
    });
    }
);

app.get("/highGPA", (req, res)=>{
    moduleB.prepare('students.json')
    .then(moduleB.highGPA).then(highest=>{
       res.render('students', {students: highest})
    }).catch(err=>{
        console.log(err.message);
    })
});

app.use((req, res) =>{
    res.status(404).send("Error 404: page Not Found");
    });





