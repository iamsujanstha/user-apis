import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export default (configService: ConfigService) => ({
  store: redisStore, // Specify Redis as the cache store
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
  ttl: 120, // Time-to-live for cached items in seconds
  username: configService.get('REDIS_USERNAME'),
  password: configService.get('REDIS_PASSWORD'),
  no_ready_check: process.env.NODE_ENV === 'production',
});
