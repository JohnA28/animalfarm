import express from 'express';
import cors from 'cors';
import Chance from 'chance'; //library to make fake data 

const app = express();
app.use(cors());
app.use(express.json());


const chance = new Chance();
//cool little trick here that converts array into array of ints
//creats a new array out of the index of original array
const animals = [...Array(250).keys()].map(id => {
  //returns an object id with randomly generated attributes
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  }
});

//endpoint for animal search
app.get('', (req, res) => {

  //filter results by query
  const q = req.query.q?.toLowerCase() || '';
  const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

  res.send(results);
});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));

