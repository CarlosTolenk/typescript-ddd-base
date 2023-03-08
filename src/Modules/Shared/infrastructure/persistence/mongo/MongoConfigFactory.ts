import config from '../../config';
import MongoConfig from './MongoConfig';

const mongoConfig = {
  url: config.get('mongo.url')
};

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return mongoConfig;
  }
}
