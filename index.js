//Saibaba
const express = require('express');
const Joi = require('joi');
const low = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())

adapter = new FileSync('db.json');
db = low(adapter);

db.defaults({
    noteses: []
}).write();

if(db.get('noteses').value().length === 0){
  const notes = {
      name: 'firstNotes',
      content: 'this is content of first notes'
  };
  db.get('noteses').push(notes).write();
}

app.get('/',(req,res) => {
  res.sendFile(__dirname+'/welcome.html');
});

app.get('/api/notes',(req,res) => {
  res.send(db.get('noteses').value());
});

app.get('/api/notes/:name',(req,res) => {
  const notes = getNotes(req.params.name);
  if(!notes) return res.status(404).send("Notes with the given name not found.")
  res.send(notes);
});

app.post('/api/notes',(req,res)=>{
  const {error} = validatePostReq(req.body);
  let duplicateNotes = undefined;
    if(error) return res.status(400).send(error.details[0].message);
    req.body.forEach(nts => {
      let notes = {
        name : nts.name,
        content : nts.content
      }
      const nots = getNotes(notes.name);
      if(nots){
        // console.log(notes.content);
        // console.log(nots);
        db.get('noteses').find({ name: nots.name })
         .assign({content: notes.content})
         .write();
      }else
       db.get('noteses').push(notes).write();
    });
      res.send(db.get('noteses').value());
});

function getNotes(nm){
  return db.get('noteses').find(e => e.name.toLowerCase() === nm.toLowerCase())
                          .value();
}

app.put('/api/notes', (req,res)=>{

  const {error} = validatePutReq(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const notes = getNotes(req.body.name);

  if(notes.length === 0) return res.status(404).send("Notes with the given name not found.");
console.log(notes);
  db.get('noteses').find({ name: notes.name })
     .assign({content: req.body.content})
     .write();

  res.send("Success");
});

app.delete('/api/notes/:name', (req,res)=>{
  if(!req.params.name)
   res.status(400).send("Notes name is manditory to delete");

  const notesIndex = db.get('noteses').findIndex({name:req.params.name}).value();
  if(notesIndex===-1)
   return res.status(404).send("Notes with the given name not found.");
  db.get('noteses').remove({name:req.params.name}).write();
  res.send("Success");
});

app.delete('/api/notes', (req,res)=>{
//  const schema = Joi.array().min(1).items(Joi.string());
  const schema = Joi.array().min(1).items(
    Joi.object({
    name : Joi.string().min(3).max(20).required()})
  );

  const {error} = schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let nonDeleted = "";
  req.body.forEach(e =>{
    console.log(e);
    const notesIndex = db.get('noteses').findIndex({name:e.name}).value();
    if(notesIndex===-1)
      nonDeleted = nonDeleted + " , " + e.name;
    db.get('noteses').remove({name:e.name}).write();
  });
  if(nonDeleted !=="")
   res.status(206).send(`Notes not found are : ${nonDeleted} remaing deleted sucessfully`);
  else
    res.send("Deleted all requested notes");
});

function validatePostReq(reqBody){
  const schema = Joi.array().min(1).items(
    Joi.object({
    name : Joi.string().min(3).max(20).required(),
    content : Joi.string().min(3).max(5000).required()
    })
  );
  const res = schema.validate(reqBody);
  return res;
}

function validatePutReq(reqBody){
  const schema =
    Joi.object({
    name : Joi.string().min(3).max(20).required(),
    content : Joi.string().min(3).max(5000).required()
  });

  const res = schema.validate(reqBody);
  return res;
}

app.listen(3000,()=>console.log("Listing at port 3000..."));
