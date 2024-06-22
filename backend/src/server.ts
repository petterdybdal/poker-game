import express from 'express';
import { createClient } from 'redis';

const app = express();
const port = 5000;
const client = createClient();

client.on('error', (err) => {
  console.log('Redis error:', err);
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
