const mongoose = require('mongoose');

// create blueprint for inputs into database
// word will have type string, must be unique, have default, convert to lowercase
// definition will be type string, to lowercase, and have a default
const WordSchema = new mongoose.Schema({
  word: { type: String, unique: true, default: '', lowercase: true },
  definition: { type: String, default: '', lowercase: true }
});

module.exports = mongoose.model('words', WordSchema);
