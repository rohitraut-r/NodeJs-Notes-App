const fs = require('fs');
const chalk = require('chalk');
const notes = require('./notes.js');
const yargs = require('yargs');

//create add command
yargs.command({
    command: 'add',
    describe : "Add a new note",
    builder: {
        title : {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body : {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {

        notes.addNote(argv.title, argv.body)

    }
})

//create remove command
yargs.command({
    command: 'remove',
    description : "Remov a new note",
    handler: () =>{
        console.log("Removing a note");
    },
    builder: {
        title : {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
    
})

//create list command
yargs.command({
    command: 'list',
    description : "List all note",
    handler(){
        notes.listAllNote();
    }
})

//create read command
yargs.command({
    command: 'read',
    description : "Read an individual Note",
    handler: (argv) =>{
        notes.read(argv.title);
    }
})

yargs.parse();
