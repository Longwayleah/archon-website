import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getLoyaltyRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  if (!redis) {
    redis = new Redis({ url, token });
  }

  return redis;
}

export function isLoyaltyStoreConfigured() {
  return Boolean(getLoyaltyRedis());
}
