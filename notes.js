const fs = require('fs');
const chalk = require('chalk')



const addNote = (title, body) =>{
    const notes = loadNotes();
    let duplicate = notes.find((note)=>note.title === title);
    
    // console.log(notes)
    

    if(!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New notee added'))
    }else{
        console.log(chalk.bgYellow('Sorry! Duplicate title are not allowed!'))
    }
    
}

const saveNotes = (notes) => { fs.writeFileSync('notes.json', JSON.stringify(notes)) }

const removeNote = (title) =>{
    
    const notes = loadNotes();
    let noteToKeep = notes.filter((note)=> note.title !== title)
    saveNotes(noteToKeep);

    if(notes.length > noteToKeep.length){
        console.log(chalk.bgRed('Note Removed'))
    }else{
        console.log(chalk.red('Note not found'));
    }
}

const listAllNote = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your Notes'))
    notes.forEach((note)=>console.log(note.title))
}

const read = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note)=>note.title === title);
    if(noteToRead !== undefined){
        console.log(chalk.bold(noteToRead.title));
        console.log(noteToRead.body);
    }else {
        console.log(chalk.bgRed('Note Not Found!'))
    }

    
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listAllNote: listAllNote,
    read: read
};