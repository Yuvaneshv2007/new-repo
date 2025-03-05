const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Note = require('./note'); 
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('Style')); 
app.set('view engine', 'ejs'); 


mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.render('index', { notes });
  } catch (err) {
    console.log(err);
    res.status(500).send('Note not sended');
  }
});


app.post('/add-note', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content });
    await newNote.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Note not saved');
  }
});


app.post('/delete-note', async (req, res) => {
  const { noteId } = req.body;
  try {
    await Note.findByIdAndDelete(noteId);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Note not Deleted');
  }
});


const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
