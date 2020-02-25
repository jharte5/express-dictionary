const express = require('express');
const router = express.Router();
const Word = require('./models/Words');

// test if router is working
router.get('/', (req, res) => {
  return res.send('Word Router Working');
});

router.post('/addword', (req, res) => {
  // validate input
  if (!req.body.word || !req.body.definition) {
    return res.status(400).json({ message: 'All inputs must be filled' });
  }
  // check to see if word is unique
  // Use the Word model and the .findOne mongoose method to compare the word in the db (word) to the input word (req.body.word)
  Word.findOne({ word: req.body.word })
    .then(word => {
      // if word is found return message and stop
      if (word) {
        return res
          .status(500)
          .json({ message: 'Word is already in the dictionary' });
      }
      //create new word and definition
      const newWord = new Word();
      newWord.word = req.body.word;
      newWord.definition = req.body.definition;

      // add word to database
      newWord
        .save()
        .then(word => {
          return res.status(200).json({ message: 'Word added', word: word });
        })
        .catch(err => {
          return res
            .status(500)
            .json({ message: 'Word was not created', err: err });
        });
    })
    .catch(err => {
      return res.status(500).json({ message: 'Server Error', err: err });
    });
});

module.exports = router;
