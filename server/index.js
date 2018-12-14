const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// curl http://localhost:8000/items
// curl -d '{"item": "Groceries"}' -H "Content-Type: application/json" -X POST http://localhost:8000/items
// curl -X DELETE http://localhost:8000/items/1

let items = [
  {
    id: 1,
    item: "Make your bed"
  },
  {
    id: 2,
    item: "Fold your clothes"
  },
]

app.get('/items', (_, res) => {
  res.jsonp(items);
})

app.post('/items', (req, res) => {
  const item = {
    id: Date.now(),
    item: req.body.item
  }
  items.push(item)
  res.jsonp(item);
})

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(found => found.id !== id)
  res.jsonp(items);
})

app.listen(8000, () => {
  console.log('JSON Server is running')
})