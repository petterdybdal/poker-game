import express from 'express';
import { createClient } from 'redis';
import bodyParser from 'body-parser';
import router from './routes/pokerRoutes';

const app = express();
const port = 5000;
const client = createClient();

client.on('error', (err) => {
  console.log('Redis error:', err);
});

app.use(bodyParser.json());
app.use('/api/poker', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
