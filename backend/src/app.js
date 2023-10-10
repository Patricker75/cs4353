import express, { json } from 'express';
import cors from 'cors';
import routes from './routes/routes';

const app = express();

app.use(json());
app.use(cors());

// Bind the routes defined in routes/index.js to application
for (let index in routes) {
  app.use(routes[index])
}

const PORT = 4001;

app.get('/', async(req, res) => {
  res.status(200)
  res.send({
    message: "OK"
  })
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})