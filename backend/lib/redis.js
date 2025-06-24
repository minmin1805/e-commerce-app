import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

let redis;

try {
  if (process.env.UPSTASH_REDIS_URL) {
    redis = new Redis(process.env.UPSTASH_REDIS_URL);
    
    // Test the connection
    redis.on('error', (err) => {
      console.warn('Redis connection error:', err.message);
      console.warn('Continuing without Redis cache...');
      redis = null;
    });
    
    redis.on('connect', () => {
      console.log('Redis connected successfully');
    });
  } else {
    console.warn('UPSTASH_REDIS_URL not found. Continuing without Redis cache...');
    redis = null;
  }
} catch (error) {
  console.warn('Failed to initialize Redis:', error.message);
  console.warn('Continuing without Redis cache...');
  redis = null;
}

// Create a wrapper that handles Redis being unavailable
export const redisClient = {
  async get(key) {
    if (!redis) return null;
    try {
      return await redis.get(key);
    } catch (error) {
      console.warn(`Redis get error for key ${key}:`, error.message);
      return null;
    }
  },
  
  async set(key, value, options = {}) {
    if (!redis) return;
    try {
      await redis.set(key, value, options);
    } catch (error) {
      console.warn(`Redis set error for key ${key}:`, error.message);
    }
  },
  
  async del(key) {
    if (!redis) return;
    try {
      await redis.del(key);
    } catch (error) {
      console.warn(`Redis del error for key ${key}:`, error.message);
    }
  }
};

// For backward compatibility
export { redis };