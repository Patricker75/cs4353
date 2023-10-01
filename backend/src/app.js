import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

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