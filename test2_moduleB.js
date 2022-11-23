console.log(`test2_moduleb found`);

const { get } = require('express/lib/response');
const fs = require('fs');
const { resolve } = require('path');

const file = "students.json";


var students = [];
var bsd = [];
var highest = [];
var stdGPA = [];



exports.prepare = (file) => {
    
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data)=>{
            if(err)reject(`could not find ${file}`);
            students = JSON.parse(data);
            if(students.length === 0)reject(`No results returned`);
            resolve(students);
        });
    });
}



exports.getBSD = (students) => {
    
    return new Promise((resolve, reject) =>{
    
       bsd = students.filter(students=>{
                return (students.program == "BSD" );
        })
    resolve(bsd)
    })
}

exports.getGPA = (students) =>{
    return new Promise ((resolve, reject) => {
    for(let i in students){
            stdGPA.push(students[i].gpa);
        }
    resolve(stdGPA);
    });
}

exports.highGPA = (students) =>{
    return new Promise((resolve, reject)=>{
        for(let i in students){
            if (students[i].gpa > highest){
                highest.push(students[i]);
            }
        }
        resolve(highest);
        });
}

