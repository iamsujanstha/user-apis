import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache() {
    await this.cacheManager.set('key', 'value', 60);
  }

  async getCache() {
    return await this.cacheManager.get('key');
  }
}
