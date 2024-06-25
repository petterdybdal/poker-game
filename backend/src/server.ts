import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/pokerRoutes';
import { connectRedis } from './redisClient';

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use('/api/poker', router);

(async () => {
  await connectRedis();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();

export default app;
