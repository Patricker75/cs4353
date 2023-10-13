const express = require('express');
const cors = require('cors');
const { json } = require('express');

import routes from './routes';

const app = express();

app.use(json());
app.use(cors());

for (let index in routes) {
  app.use(routes[index])
}

const PORT = 4001;

app.get('/', (req, res) => {
  res.status(200)
  res.send({
    message: "Hello from server"
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
