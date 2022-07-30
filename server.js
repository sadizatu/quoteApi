const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`server is listening on Port ${PORT} `);[]
})

const quoteRoute = express.Router();
app.use('/api/quotes', quoteRoute)


quoteRoute.get("/", (req, res) => {
  const person = req.query.person;
  const filterPerson = quotes.filter((item) => item.person === person);

  if (filterPerson && filterPerson.length) {
    const foundPerson = {
      quotes: filterPerson,
    };
    res.send(foundPerson);
  } else {
    const allQuotes = {
      quotes,
    };
    res.status(200).send(allQuotes);
  }
});
 
 quoteRoute.get('/random', (req, res) => {
   const randomQuote =  getRandomElement(quotes);
   if(randomQuote) {
     const result = {
       quote: randomQuote,
     };
     res.status(200).send(result);
   } else {
     res.status(401).send();
   }
 }) 



//  app.