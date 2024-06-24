import { createClient } from 'redis';

const client = createClient({
  url: 'redis://redis:6379',
});

client.on('error', (err) => {
  console.log('Redis error:', err);
});

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

export { client, connectRedis };
