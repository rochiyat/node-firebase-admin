import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript and Firebase!');
});

app.use('/api', routes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
